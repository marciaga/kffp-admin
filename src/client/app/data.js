// mapping of data model + form fields

const show = {
    new: {
        fields: {
            showName: 'Text',
            users: 'Select',
            startTime: 'Time',
            endTime: 'Time',
            isActive: 'ToggleField'
        }
    }
};

const user = {
    fields: {
        firstName: 'Text',
        lastName: 'Text',
        email: 'Text',
        password: 'Password'
    }
};

const playlist = {
    fields: {

    }
};

export default {
    show,
    user,
    playlist
};
