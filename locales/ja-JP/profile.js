export default {
    title : {
        show : '個人情報',
        edit : '個人情報を編集する',

        security : '帳戶安全',
            password : 'パスワードを変更する',

        passwordConfirm : 'パスワード確認',

        mobile : '携帯電話の連動',
        provider : '外部帳號連結',
        preferences : 'その他',
        twoFactor : '兩階段驗證',
        premium : '会員プラン',
    },

    avatar : 'アバター',
    avatarHint : '形式：JPG/PNG/BMP<br/>推奨サイズ：400 x 400px',

    name : '名前',
    password  : 'パスワード',

    email : 'メール',
    emailValidate : '確認済み',
    emailNotValidate : '未確認',
    emailNotValidateHint : 'メールアドレスが確認されていません',
    emailNotValidateProcess : 'クリックして確認メールを送信して',
    emailValidateSended : '信件已發送，請至信箱收取信件',
    emailValidateSuccess : 'メールアドレスが検証されました！',

    birthday : '誕生日',
    language : '言語',

    languageHint : {
        'en'    : 'English',
        'ja'    : '日本語',
        'zh-TW' : '繁體中文',
    },

    currency : '貨幣',

    currencyHint : {
        EUR : 'ユーロ (EUR)',
        JPY : '日本円 (JPY)',
        TWD : '台湾ドル (TWD)',
        USD : 'ドル (USD)',
    },

    gender: '性別',

    genderHint : {
        male: '男性',
        female: '女性',
        unknown: '公表しない',
    },

    passwordForget : 'パスワードを忘れました?',
    oldPassword : '元のパスワード',
    newPassword : '新しいパスワードを設定する',
    newPassword1Placeholder : '長度至少 8 個字元',
    newPassword2Placeholder : '新しいパスワードを再入力してください',

    passwordNotMatch: 'パスワードが間違っています',
    passwordChanged: 'パスワードが変更されました。次回ログイン時には、新しいパスワードを使用してください',
    oldPasswordNotMatch: '元のパスワードが一致しません',

    passwordForgetError: 'パスワード再設定用のURLを送信いたします，見つからない場合は、しばらくしてから再度クリックしてください。',
    passwordForgetHint : 'パスワード再設定用のURLを送信いたします ({email})。再設定メールが届かない場合、メールボックスにて「OwlTing」を検索するか、迷惑メールフォルダをご確認ください。',

    countryCode : '国コード',

    mobile : '携帯番号',
    mobileNull : '携帯電話がバインドされていません',
    mobileValidate : '検証済み',
    mobileValidateSuccess : '認証が成功しました',
    mobileValidateSuccessHint : '驗證が完了しました',
    mobileValidateFail : '認証に失敗しました',
    mobileValidateFailHint : '再度操作してください',
    mobileBindHint : '携帯をバインドする前に、ユーザーパスワードを確認する必要があります',


    verificationCode : '認証コード',
    verificationCodeGet : '認証コードを取得する',

    verificationCountDown: '認証コードを取得 ({time})',

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

    premium : {
        title : 'プレミアム会員 - {type}',
        info : "<div style='font-size:1.3rem; color:#25819e; font-weight:bold'>プレミアム会員にアップグレードする</div>\
        <div style='margin-top:12px; font-size:1.3rem'>旅行予約、安全な食材が 10% オフ、さらに無制限の送料無料</div>\
        <div style='margin-top:12px; font-size:0.9rem; color:#666'>いつでもキャンセル、お悩みなし！月額 $249、年間支払いがさらにお得！</div>",

        period : 'プラン特典期間',
        redirect : 'プレミアム情報を取得します',

        type : {
            OPY : '年払い',
            OPM : '月払い',
            OPV : '期限切れ',

            OPFY : '無料',
            OPFM : '無料',
        }

    }
}