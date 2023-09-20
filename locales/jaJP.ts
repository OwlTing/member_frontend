import profile from './ja-JP/profile.js';
import project from './ja-JP/project.js';
import reservation from './ja-JP/reservation.js';

let lang = {
    m: {
        app     : '会員センター',

        show    : '表示',

        login   : 'ログイン',
        logout  : 'ログアウト',

        tool    : 'ツール',
        noData  : 'データがありません',

        status  : 'ステータス',
        ok      : '確定',
        save    : '保存',
        reset   : 'リセット',
        waiting : 'しばらくお待ちください',
        clear   : 'クリア',
        cancel  : 'キャンセル',
        close   : '閉じる',
        preview : 'プレビュー',
        search  : '検索',
        create  : '追加する',
        submit  : '送信',

        def  : 'デフォルト',

        unfold : '展開する',
        fold : '折り畳む',

        confirm         : "確認する",
        confirmDestory  : "削除してもよろしいですか？（削除後は復元できません）",

        edit  : '編集する',
        upload  : 'アップロード',
        destory : '削除',
        created_at : '作成時間',

        langChange: '言語を変更する',

        selectPlease  : '選択してください',

        skip : 'スキップ',
        done : '完了',
        next : '次のステップ',
        prev : '前のステップ',

        back : '戻る',

        input: {
            required : '必要な情報が不足しています'
        }
    },

    sidebar: {
        profile: '基本情報',

        consumption: '消費履歴',
    },

    project     : {...project},
    profile     : {...profile},
    reservation : {...reservation},
}


export default lang;