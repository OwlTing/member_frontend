<template>
    <b-container>
        <b-card>
            <b-card-title class="clearfix">
                <NuxtLink :to="{ name: 'profile-show'}">
                    <fa icon="arrow-left" class="mr-3" />
                </NuxtLink>
                <span>{{ $t('profile.title.edit') }}</span>
            </b-card-title>

            <b-row>
                <b-col md="7" sm="10" xs="12">
                    <div class="clearfix">

                        <div class="mb-2">
                            <strong>{{ $t('profile.avatar') }}</strong>
                        </div>

                        <div>
                            <div class="uploadBox" v-if="uploadBox">
                                <div class="overlay"></div>
                                <div class="cropperBox">
                                    <div class="cropper">
                                        <cropper ref="cropper" class="upload-cropper" :src="image.src" :canvas="{height: 400, width: 400}" :stencil-props="{aspectRatio: 1/1}"/>
                                    </div>
                                    <div class="toolBox bg-white text-center">
                                        <div class="btn btn-primary w-50" @click="handleUploading()"><fa icon="upload" /> {{ $t('m.upload') }}</div>
                                        <div class="btn btn-light w-50" @click="uploadCancel()"><fa icon="xmark" /> {{ $t('m.cancel') }}</div>
                                    </div>
                                </div>
                            </div>

                            <div style="position:relative; width:200px; border-radius:6px; outline:1px solid #ccc; overflow:hidden; user-select:none;">
                                <div v-show="form.uploading" style="position:absolute; top:0; bottom:0; right:0; left:0; z-index:5; background:rgba(0,0,0,.5); color:#fff">
                                    <div style="position:absolute; inset:0 0 0 0; margin:auto; margin-top:80px; width:40px; height:40px; line-height:40px;">
                                        <fa icon="spinner" style="font-size:40px"/>
                                    </div>
                                </div>

                                <b-avatar square :src="form.avatar" size="200px"></b-avatar>

                                <template v-if="form.avatar == avatar">
                                    <div style="text-align:center; padding:8px 16px; position:relative">
                                        <input type="file" ref="file" @change="loadImage($event)" accept="image/*" style="cursor:pointer; opacity:0; position:absolute; top:0; left:0; right:0; bottom:0">
                                        {{ $t('m.upload') }}
                                    </div>
                                </template>
                                <template v-else>
                                    <div style="text-align:center; padding:8px 16px; cursor:pointer" @click="avatarDestory">
                                        {{ $t('m.destory') }}
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div style="font-size:14px; color:#3C4145; margin-top:16px" v-html="$t('profile.avatarHint')" />
                    </div>

                    <div class="mt-5">
                        <b-form @submit="onSubmit" @submit.stop.prevent>
                            <b-form-group :label="$t('profile.email')" style="margin-top:40px">
                                <b-form-input :value="email" disabled></b-form-input>
                            </b-form-group>

                            <b-form-group :label="$t('profile.name')" style="margin-top:40px" required>
                                <b-form-input v-model="form.name" autofocus required></b-form-input>
                            </b-form-group>

                            <b-form-group :label="$t('profile.birthday')" style="margin-top:40px" required>

                                <client-only>
                                    <date-picker placeholder="YYYY-MM-DD" format="yyyy-MM-dd" v-model="form.birthday" input-class="form-control" :typeable="true" :required="true" :bootstrap-styling="true" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('birthday')) }" required />
                                </client-only>

                                <b-form-invalid-feedback v-if="formerrs.hasOwnProperty('birthday')">
                                    {{ formerrs.birthday.join(', ') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group :label="$t('profile.gender')" style="margin-top:40px" required>
                                <b-form-radio-group v-model="form.gender" :options=" [
                                    { text: $t('profile.genderHint.male'),      value: 'male'       },
                                    { text: $t('profile.genderHint.female'),    value: 'female'     },
                                    { text: $t('profile.genderHint.unknown'),   value: 'unknown'    }
                                ]" inline required></b-form-radio-group>
                            </b-form-group>

                            <b-form-group style="margin-top:40px">
                                <b-button type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.save') }}</b-button>
                            </b-form-group>
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </b-card>

    </b-container>
</template>

<script>

import api from '~/api/api.js';

function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
    let header = '';
    for (let i = 0; i < byteArray.length; i++) {
       header += byteArray[i].toString(16);
    }
	switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return fallback;
    }
}

export default {

    layout: 'main',

    data() {
        return {

            uploadBox: false,

            email : '',

			image: {
				src: null,
				type: null
			},

            form: {
                loading     : false,
                uploading   : false,
                trigger     : false,

                option      : {
                    request : null,
                    output  : null,
                    mimes   : 'image/png, image/jpeg, image/bmp',
                },

                avatar      : null,
                name        : null,
                birthday    : null,
                gender      : 'unknown',
            },

            formerrs: {},

            avatar : process.env.SSO_AVATAR
        }
    },

    computed: {
        profile () {
            return this.$store.state.user.profile;
        }
    },

    created() {

        this.$nuxt.$emit('breadcrumbLoading', [ {
            text: this.$t('profile.title.show'),
            to : {name : 'profile-show'}
        }, {
            text: this.$t('m.edit'),
        }]);

        this.form.name          = this.profile.name;
        this.email              = this.profile.email;
        this.form.birthday      = this.profile.birthday;
        this.form.avatar        = this.profile.avatar;
        this.form.gender        = this.profile.gender;
    },



    methods: {

        async onSubmit(e) {

            this.form.loading = true;

            let ret = await api.auth.update({
                name     : this.form.name,
                birthday : this.$dayjs(this.form.birthday).format('YYYY-MM-DD'),
                gender   : this.form.gender,
                avatar   : this.form.avatar
            });

            if ( !ret.status ) {
                this.form.loading = false;
                this.$set(this, 'formerrs', ret.error);

                return;
            }

            this.$store.dispatch('user/profile', ret.data.user);

            this.$router.push({ name: 'profile-show' });
        },

        avatarDestory() {
            this.form.avatar = this.avatar;
        },

        uploadCancel () {
            this.destroyed();
            this.reset();
            this.uploadBox = false;
        },

		handleUploading() {
			const { canvas } = this.$refs.cropper.getResult();
			if (!canvas) return;

            this.uploadBox = false;
            this.form.uploading = true;

            const frm = new FormData();

			canvas.toBlob( async (blob) => {

                frm.append('file', blob);

                const ret = await api.auth.avatar(frm);

                this.form.avatar = ret.data.path;

                this.form.uploading = false;

			}, this.image.type);
		},

		reset() {
			this.image = {src: null, type: null};
		},

		loadImage(event) {

			const { files } = event.target;

			if (files && files[0]) {

                this.form.trigger = true;

				if (this.image.src) {
					URL.revokeObjectURL(this.image.src)
				}

				const blob = URL.createObjectURL(files[0]);
				const reader = new FileReader();

				reader.onload = (e) => {

                    this.uploadBox = true;
					this.image = {
						src: blob,
						type: getMimeType(e.target.result, files[0].type),
					};
				};

				reader.readAsArrayBuffer(files[0]);
			}
		},

        destroyed() {

            if (this.image.src) {
                URL.revokeObjectURL(this.image.src)
            }
        }
    },

}

</script>


<style scoped lang="scss">

    .uploadBox .overlay     {position:fixed; top:0; bottom:0; left: 0; right: 0; display:flex; justify-content: center; background-color:#0006; z-index:10}
    .uploadBox .cropperBox  {position:fixed; top:50%; left:50%; z-index:15; width:400px; border-radius:10px; transform:translate(-50%, -50%); overflow:hidden}

    .uploadBox .toolBox {display:flex;}
        .uploadBox .toolBox .btn {flex: 1 1 auto; border-radius:0}



    .vue-simple-handler {border:1px solid #333}

</style>