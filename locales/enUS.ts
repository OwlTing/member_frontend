import profile from './en-US/profile.js';
import project from './en-US/project.js';
import reservation from './en-US/reservation.js';

let lang = {
    m: {
        app     : 'Member Center',

        show    : 'Show',

        login   : 'Login',
        logout  : 'Logout',

        tool    : 'Tool',
        noData  : 'No Data',

        status  : 'Status',
        ok      : 'Ok',
        save    : 'Save',
        reset   : 'Reset',
        waiting : 'Waiting',
        clear   : 'Clear',
        cancel  : 'Cancel',
        close   : 'Close',
        preview : 'Preview',
        search  : 'Search',
        create  : 'Create',
        submit  : 'Submit',

        def  : 'Default',

        unfold : 'Unfold',
        fold : 'Fold',

        confirm         : "Confirm",
        confirmDestory  : "Are you sure? (It couldn't restore after this was deleted)",

        edit  : 'Edit',
        upload  : 'Upload',
        destory : 'Destory',
        created_at : 'Create At',

        langChange: 'Change Language',

        selectPlease  : 'Please Select',

        skip : 'Skip',
        done : 'Complete',
        next : 'Next',
        prev : 'Prev',

        back : 'Back to Prev Page',

        input: {
            required : 'Leak of required data'
        }
    },

    sidebar: {
        profile: 'Profile',
        premium: 'Premium Member',
        consumption: 'Consumption',
        wallet: 'Crypto Wallet',
    },
    
    project     : {...project},
    profile     : {...profile},
    reservation : {...reservation},
}


export default lang;