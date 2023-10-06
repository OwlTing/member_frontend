export default {
    title : {
        show : '個人資料',
        edit : '編輯個人資料',

        security : '帳戶安全',
            password : '變更密碼',

        passwordConfirm : '密碼驗證',

        mobile : '手機綁定',
        provider : '外部帳號連結',
        preferences : '偏好設定',
        twoFactor : '兩階段驗證',
        premium : '會員方案',
        address : '錢包地址',
    },

    avatar : '大頭貼',
    avatarHint : '上傳格式：JPG/PNG/BMP<br />建議尺寸：400 x 400px',

    name : '名稱',
    password  : '密碼',

    email : '信箱',
    emailValidate : '已驗證',
    emailNotValidate : '未驗證',
    emailNotValidateHint : '電子郵件地址尚未驗證',
    emailNotValidateProcess : '點此寄送驗證',
    emailValidateSended : '信件已發送，請至信箱收取信件',
    emailValidateSuccess : '歡迎，您已成功驗證您的電子郵件地址！',

    birthday : '生日',
    language : '語言',

    languageHint : {
        'en'    : 'English',
        'ja'    : '日本語',
        'zh-TW' : '繁體中文',
    },

    currency : '貨幣',

    currencyHint : {
        EUR : '歐元 (EUR)',
        JPY : '日圓 (JPY)',
        TWD : '新台幣 (TWD)',
        USD : '美金 (USD)',
    },

    gender: '性別',

    genderHint : {
        male: '男性',
        female: '女性',
        unknown: '不願透露',
    },

    passwordForget : '忘記密碼?',
    oldPassword : '原始密碼',
    newPassword : '設定新密碼',
    newPassword1Placeholder : '長度至少 8 個字元',
    newPassword2Placeholder : '再次輸入新密碼',

    passwordNotMatch: '密碼錯誤',
    passwordChanged: '密碼已變更，下次登入請使用新密碼',
    oldPasswordNotMatch: '原始密碼不符合',

    passwordForgetError: '密碼重設已發送到您的信箱，如未能找到請稍後再點擊 [忘記密碼]',
    passwordForgetHint : '密碼重設信已發送到您的信箱 ({email})，請依說明進行密碼重設，如找不到重設信，請查看「垃圾信件」，或於信箱程式內搜尋「OwlTing」。',

    countryCode : '國碼',

    mobile : '手機號碼',
    mobileNull : '沒有綁定手機',
    mobileValidate : '已驗證',
    mobileValidateSuccess : '驗證成功',
    mobileValidateSuccessHint : '您已經完成驗證',
    mobileValidateFail : '驗證失敗',
    mobileValidateFailHint : '請重新操作',
    mobileBindHint : '手機綁定前需先驗證用戶密碼',


    verificationCode : '驗證碼',
    verificationCodeGet : '獲取驗證碼',

    verificationCountDown: '獲取驗證碼 ({time})',

    providerConnect : '與 {item} 帳號連結',
    providerHint : '未經您的允許，我們不會使用您的個人資訊',
    providerUnbind : '解除連結',
    providerUnbindHint : '已成功解除綁定',
    providerBindFailTitle : '操作失敗',
    providerBindHint : '已成功綁定',
    providerCFUnbindHint : '確定是否要解除綁定?',

    twoFactor: '兩階段驗證',
    twoFactorWarning: '警告提示',
    twoFactorWarningHint: '關閉將降低您帳戶的安全，確定關閉兩階段驗證？',
    twoFactorStatus: '兩階段驗證狀態',
    twoFactorStatusNote: '開啟兩階段驗證以保護您帳號的安全',

    twoFactorStatusHint: {
        enable : '開啟',
        disable : '關閉',
    },
    twoFactorBindHint : '設定兩階段驗證功能前需先驗證用戶密碼',

    twoFactorChange : '更換驗證方式',
    twoFactorHint: {
        EMAIL : {
            title: '電子郵件',
            hint: '電子郵件',
        },

        GOOGLE : {
            title: 'Google 身分驗證器',
            hint: 'Google 身分驗證器',
        }
    },

    address : {
        address : '我的錢包地址',
        note    : '備註',
        refresh: '更新資產',
        update: '更新地址'
    },


    premium : {
        title : 'Premium 鑽石會員 - {type}',
        info : "<div style='font-size:1.3rem; color:#25819e; font-weight:bold'>升級成 Premium 鑽石會員</div>\
        <div style='margin-top:12px; font-size:1.3rem'>旅遊訂房、安心食材 9 折起，再享不限次數免運</div>\
        <div style='margin-top:12px; font-size:0.9rem; color:#666'>隨時取消免煩惱！月繳 $249，年繳更優惠！</div>",

        period : '方案優惠期間',
        redirect : '按此取得更多 Premium 資訊',

        type : {
            OPY : '年繳',
            OPM : '月繳',
            OPV : '已過期',

            OPFY : '免費',
            OPFM : '免費',
        }
    }
}