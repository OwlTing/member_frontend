import profile from './zh-TW/profile.js';
import project from './zh-TW/project.js';
import reservation from './zh-TW/reservation.js';

let lang = {
    m: {
        app     : '會員中心',

        show    : '顯示',

        login   : '登入',
        logout  : '登出',

        tool    : '工具',
        noData  : '無資料',

        status  : '狀態',
        ok      : '確定',
        save    : '儲存',
        reset   : '重設',
        waiting : '請稍後',
        clear   : '清除',
        cancel  : '取消',
        close   : '關閉',
        preview : '預覽',
        search  : '搜尋',
        create  : '新增',
        submit  : '送出',

        def  : '預設',

        unfold : '展開',
        fold : '摺疊',

        confirm         : "確認",
        confirmDestory  : "確認要刪除嗎? (刪除後就無法還原囉)",

        edit  : '編輯',
        upload  : '上傳',
        destory : '刪除',
        created_at : '建立時間',

        langChange: '更改語系',

        selectPlease  : '請選擇',

        skip : '跳過',
        done : '完成',
        next : '下一步',
        prev : '上一步',

        back : '回上一頁',

        input: {
            required : '缺少必要資訊'
        }
    },

    sidebar: {
        profile: '基本資料',
        premium: '鑽石會員',
        address: '虛擬錢包',

        consumption: '消費紀錄',
        walletpro: '奧丁丁錢包'
    },

    project     : {...project},
    profile     : {...profile},
    reservation : {...reservation},
}


export default lang;