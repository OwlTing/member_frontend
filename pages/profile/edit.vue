<template>
    <BContainer>
        <BCard>
            <BCardTitle class="clearfix">
                <NuxtLink :to="{ name: 'profile-show'}">
                    <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                </NuxtLink>
                <span>{{ $t('profile.title.edit') }}</span>
            </BCardTitle>
            <BRow>
                <BCol md="7" sm="10" xs="12">
                    <div class="clearfix">

                        <div class="mb-2">
                            <strong>{{ $t('profile.avatar') }}</strong>
                        </div>

                        <div>
                            <div class="uploadBox" v-if="uploadBox">
                                <div class="overlay"></div>
                                <div class="cropperBox">
                                    <div class="cropper">
                                        <cropper ref="cropperBox" class="upload-cropper" :src="image.src" :canvas="{height: 400, width: 400}" :stencil-props="{aspectRatio: 1/1}"/>
                                    </div>
                                    <div class="toolBox bg-white text-center">
                                        <div class="btn btn-primary w-50" @click="handleUploading()"><Icon name="fa:upload" color="#fff" class="me-1" /> {{ $t('m.upload') }}</div>
                                        <div class="btn btn-light w-50" @click="uploadCancel()"><Icon name="fa6-solid:xmark" class="me-1"/> {{ $t('m.cancel') }}</div>
                                    </div>
                                </div>
                            </div>

                            <div style="position:relative; width:200px; border-radius:6px; outline:1px solid #ccc; overflow:hidden; user-select:none;">
                                <div v-show="form.uploading" style="position:absolute; top:0; bottom:0; right:0; left:0; z-index:5; background:rgba(0,0,0,.5); color:#fff">
                                    <div style="position:absolute; inset:0 0 0 0; margin:auto; margin-top:80px; width:40px; height:40px; line-height:40px;">
                                        <Icon name="fa:spinner" width="40" height="40"/>
                                    </div>
                                </div>

                                <BAvatar square :src="form.avatar" size="200px" />

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
                        <BForm @submit="onSubmit" @submit.stop.prevent>
                            <BFormGroup :label="$t('profile.email')" style="margin-top:40px">
                                <BFormInput v-model="form.email" disabled></BFormInput>
                            </BFormGroup>

                            <BFormGroup :label="$t('profile.name')" style="margin-top:40px" required>
                                <BFormInput v-model="form.name" autofocus required></BFormInput>
                            </BFormGroup>

                            <BFormGroup :label="$t('profile.birthday')" style="margin-top:40px" required>

                                <client-only>
                                    <date-picker placeholder="YYYY-MM-DD" format="yyyy-MM-dd" v-model="form.birthday" input-class="form-control" :typeable="true" :enable-time-picker="false" :required="true" :bootstrap-styling="true" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('birthday')) }" auto-apply :clearable="false" required />
                                </client-only>

                                <BFormInvalidFeedback v-if="formerrs.hasOwnProperty('birthday')">
                                    {{ formerrs.birthday.join(', ') }}
                                </BFormInvalidFeedback>
                            </BFormGroup>

                            <BFormGroup :label="$t('profile.gender')" style="margin-top:40px" required>
                                <BFormRadioGroup v-model="form.gender" :options=" [
                                    { text: $t('profile.genderHint.male'),      value: 'male'       },
                                    { text: $t('profile.genderHint.female'),    value: 'female'     },
                                    { text: $t('profile.genderHint.unknown'),   value: 'unknown'    }
                                ]" inline required></BFormRadioGroup>
                            </BFormGroup>

                            <BFormGroup style="margin-top:40px">
                                <BButton type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.save') }}</BButton>
                            </BFormGroup>
                        </BForm>
                    </div>
                </BCol>
            </BRow>
        </BCard>

    </BContainer>
</template>

<script setup>

    const router    = useRouter();
    const cfg       = useRuntimeConfig();

    import api from '~/api/api.js';

    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })
    
    const dayjs = useDayjs();

    const { t } = useI18n()

    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.show'),
        to : router.resolve({name:'profile-show'}).path
    }, {
        text: t('m.edit'),
    }]);

    useHead({
        title: t('profile.title.edit')
    })

    const AuthStore = useAuthStore();
    
    const cropperBox = ref();

    let uploadBox   = ref(null);

    let email       = ref(AuthStore.profile.email);
    let avatar      = ref(cfg.public.ssoAvatar);

    let image = reactive({
        src: null,
        type: null
    });

    let form = reactive({
        loading     : false,
        uploading   : false,
        trigger     : false,

        option      : {
            request : null,
            output  : null,
            mimes   : 'image/png, image/jpeg, image/bmp',
        },

        email       : AuthStore.profile.email,
        avatar      : AuthStore.profile.avatar,
        name        : AuthStore.profile.name,
        birthday    : AuthStore.profile.birthday,
        gender      : AuthStore.profile.gender,
    });

    let formerrs = reactive({});

    function avatarDestory() {
        form.avatar = avatar.value;
    }

	function loadImage(event) {

        const { files } = event.target;

        if (files && files[0]) {

            form.trigger = true;

            if (image.src) {
                URL.revokeObjectURL(image.src)
            }

            const blob   = URL.createObjectURL(files[0]);
            const reader = new FileReader();

            reader.onload = (e) => {

                uploadBox.value = true;
                image = {
                    src: blob,
                    type: getMimeType(e.target.result, files[0].type),
                };
            };

            reader.readAsArrayBuffer(files[0]);
        }
    }


	function handleUploading() {

        if (!cropperBox.value) return;

        const { canvas } = cropperBox.value.getResult();

        uploadBox.value = false;
        form.uploading = true;

        const frm = new FormData();

        canvas.toBlob( async (blob) => {

            frm.append('file', blob);

            const ret = await api.profile.avatar(frm);

            form.avatar = ret.data.path;

            form.uploading = false;

        }, image.type);
    }


    function uploadCancel () {
        destroyed();
        reset();
        uploadBox.value = false;
    }

    function reset() {
        image = {src: null, type: null};
    }

    function destroyed() {

        if (image.src) {
            URL.revokeObjectURL(image.src)
        }
    }

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

    async function onSubmit(e) {

        form.loading = true;

        let ret = await api.profile.update({
            name     : form.name,
            birthday : dayjs(form.birthday).format('YYYY-MM-DD'),
            gender   : form.gender,
            avatar   : form.avatar
        });

        if ( !ret.status ) {
            form.loading = false;
            formerrs = ret.error;

            return;
        }

        form.loading = true;

        AuthStore.update(ret.data.user);

        await navigateTo({ name: 'profile-show' });
    }

</script>


<style scoped lang="scss">

    .uploadBox .overlay     {position:fixed; top:0; bottom:0; left: 0; right: 0; display:flex; justify-content: center; background-color:#0006; z-index:10}
    .uploadBox .cropperBox  {position:fixed; top:50%; left:50%; z-index:15; width:400px; border-radius:10px; transform:translate(-50%, -50%); overflow:hidden}

    .uploadBox .toolBox {display:flex;}
        .uploadBox .toolBox .btn {flex: 1 1 auto; border-radius:0}



    .vue-simple-handler {border:1px solid #333}

</style>