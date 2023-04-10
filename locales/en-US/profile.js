export default {
    title : {
        show : 'Profile',
        edit : 'Profile Setting',

        security : 'Account Security',
            password : 'Change Password',

        passwordConfirm : 'Password Confirmation',

        mobile : 'Binding Mobile',
        provider : 'Social Media Connection',
        preferences : 'Preferences',
        twoFactor : 'Two Factor Validation'
    },

    avatar : 'Avatar',
    avatarHint : 'Upload format: JPG/PNG/BMP<br />Resolution Suggestion: 400 x 400px',

    name : 'Name',
    password  : 'Password',

    email : 'E-mail',
    emailValidate : 'E-mail Validated',
    emailNotValidate : 'E-mail Invalidated',
    emailNotValidateHint : '電子郵件地址尚未驗證',
    emailNotValidateProcess : '點此寄送驗證',
    emailValidateSended : '信件已發送，請至信箱收取信件',
    emailValidateSuccess : '歡迎，您已成功驗證您的電子郵件地址！',

    birthday : 'Birthday',
    language : 'Language',

    languageHint : {
        'en'    : 'English',
        'ja'    : '日本語',
        'zh-TW' : '繁體中文',
    },

    currency : 'Currency',

    currencyHint : {
        EUR : 'Euro (EUR)',
        JPY : 'Japanese Yen (JPY)',
        TWD : 'New Taiwan Dollar (TWD)',
        USD : 'United States dollar (USD)',
    },

    gender: 'Gender',

    genderHint : {
        male: 'Male',
        female: 'Female',
        unknown: 'Unknown',
    },

    passwordForget : 'Forget password?',
    oldPassword : 'Original Password',
    newPassword : 'New Password',
    newPassword1Placeholder : 'Password must be at least 8 characters.',
    newPassword2Placeholder : 'Password Confirm',

    passwordNotMatch: 'Password doesn\'t Match',
    passwordChanged: '密碼已變更，下次登入請使用新密碼',
    oldPasswordNotMatch: 'Please make sure your password match',

    passwordForgetError: 'The password reset e-mail has been sent successfully ({email}). If you can not find the mail, please wait for a second.',
    passwordForgetHint : 'The password reset e-mail has been sent successfully ({email}). If you can not find the mail, please check \"spam\" or search for \"OwlTing\".',

    countryCode : 'Country Code',

    mobile : 'Mobile Number',
    mobileNull : 'No binded mobile',
    mobileValidate : 'Validated',
    mobileValidateSuccess : 'Validation Success',
    mobileValidateSuccessHint : 'Mobile Validation Success',
    mobileValidateFail : 'Validation Fail',
    mobileValidateFailHint : 'Try Again',
    mobileBindHint : 'You have to enter the password before binding.',


    verificationCode : 'Verification Code',
    verificationCodeGet : 'Get Validation Code',

    verificationCountDown: 'Get Validation Code ({time})',

    providerConnect : 'Connect with {item}',
    providerHint : 'We will not collect the profile info without your permission.',
    providerUnbind : 'Unlink',
    providerUnbindHint : 'Social Media Unlink Successfully',
    providerBindFailTitle : '操作失敗',
    providerBindHint : 'Connect Successfully',
    providerCFUnbindHint : '確定是否要解除綁定?',

    twoFactor: 'Two Factor Validation',
    twoFactorWarning: 'Warning',
    twoFactorWarningHint: '關閉將降低您帳戶的安全，確定關閉兩階段驗證？',
    twoFactorStatus: '兩階段驗證狀態',
    twoFactorStatusNote: '開啟兩階段驗證以保護您帳號的安全',

    twoFactorStatusHint: {
        enable : 'Enable',
        disable : 'Disable',
    },
    twoFactorBindHint : '設定兩階段驗證功能前需先驗證用戶密碼',

    twoFactorChange : 'Change Validation Method',
    twoFactorHint: {
        EMAIL : {
            title: 'E-mail',
            hint: 'E-mail'
        },

        GOOGLE : {
            title: 'Google Authenticator',
            hint: 'Google Authenticator'
        }
    },
}