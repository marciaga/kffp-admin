// mapping of data model + form fields
const show = {
    new: {
        fields: {
            showName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter the show name',
                label: 'Show Name'
            },
            users: {
                fieldType: 'AutoCompleteField',
                name: 'text',
                label: 'Select a DJ',
                hintText: 'Type a name'
            },
            startTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time'
            },
            endTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time'
            },
            isActive: {
                fieldType: 'ToggleField',
                label: 'Active Show?'
            }
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
