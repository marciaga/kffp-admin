import { daysOfWeek, userRoles } from './utils/constants';
// mapping of data model + form fields
const shows = {
    new: {
        fields: {
            showName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter the show name',
                label: 'Show Name',
                validation: ['string', 'required']
            },
            users: {
                fieldType: 'AutoCompleteField',
                name: 'autocomplete_field',
                label: 'Select a DJ',
                hintText: 'Type a name',
                validation: ['required', 'array']
            },
            dayOfWeek: {
                fieldType: 'Select',
                label: 'Day of the Week',
                name: 'select',
                hintText: 'Select a Day of the Week',
                items: daysOfWeek.map(d => ({
                    label: d,
                    value: d
                })),
                validation: ['required', 'string']
            },
            startTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time',
                validation: ['required', 'number']
            },
            endTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time',
                validation: ['required', 'number']
            },
            isActive: {
                fieldType: 'ToggleField',
                label: 'Active Show?',
                value: true // default toggled
            },
            slug: {
                fieldType: 'Text',
                name: 'text',
                label: 'Slug',
                hintText: 'Enter the show slug',
                validation: ['required', 'string']
            },
            description: {
                fieldType: 'TextArea',
                name: 'textarea',
                label: 'Description',
                hintText: 'Enter the show\'s description here'
            },
            primaryImage: {
                fieldType: 'FileInput',
                name: 'file',
                label: 'Main Image'
            }
        }
    },
    show: {
        fields: {
            showName: {
                label: 'Show Name'
            },
            users: {
                label: 'DJ(s)'
            },
            dayOfWeek: {
                label: 'Day of the Week'
            },
            startTime: {
                label: 'Start Time'
            },
            endTime: {
                label: 'End Time'
            },
            isActive: {
                label: 'Active'
            },
            slug: {
                label: 'Slug'
            }
        }
    },
    edit: {
        fields: {
            _id: {
                fieldType: 'Hidden'
            },
            showName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter the show name',
                label: 'Show Name',
                validation: ['string', 'required']
            },
            users: {
                fieldType: 'AutoCompleteField',
                name: 'autocomplete_field',
                label: 'Select a DJ',
                hintText: 'Type a name',
                validation: ['required', 'array']
            },
            dayOfWeek: {
                fieldType: 'Select',
                label: 'Day of the Week',
                name: 'select',
                hintText: 'Select a Day of the Week',
                items: daysOfWeek.map(d => ({
                    label: d,
                    value: d
                })),
                validation: ['required', 'string']
            },
            startTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time',
                validation: ['required', 'number']
            },
            endTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time',
                validation: ['required', 'number']
            },
            isActive: {
                fieldType: 'ToggleField',
                label: 'Active Show?',
                value: true, // default toggled
                validation: ['required', 'boolean']
            },
            slug: {
                fieldType: 'Text',
                name: 'text',
                label: 'Slug',
                disabled: true,
                validation: ['required', 'string']
            },
            description: {
                fieldType: 'TextArea',
                name: 'textarea',
                label: 'Description',
                hintText: 'Enter the show\'s description here'
            },
            primaryImage: {
                fieldType: 'FileInput',
                name: 'file',
                label: 'Main Image'
            }
        }
    }
};

const users = {
    new: {
        fields: {
            displayName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter name as it should be displayed',
                label: 'DJ Name',
                validation: ['required', 'string']
            },
            email: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter Email Address',
                label: 'Email',
                validation: ['required', 'string']
            },
            password: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Choose a password',
                label: 'Password'
            },
            role: {
                fieldType: 'Select',
                label: 'User Role',
                name: 'select',
                hintText: 'Select a User Role',
                items: userRoles.map(r => ({
                    label: r,
                    value: r
                })),
                validation: ['required', 'string']
            }
        }
    },
    show: {
        fields: {
            displayName: {
                label: 'Display Name'
            },
            email: {
                label: 'Email'
            },
            role: {
                label: 'Role'
            }
        }
    },
    edit: {
        fields: {
            _id: {
                fieldType: 'Hidden'
            },
            displayName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter name as it should be displayed',
                label: 'DJ Name',
                validation: ['required', 'string']
            },
            email: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter Email Address',
                label: 'Email',
                validation: ['required', 'string']
            },
            role: {
                fieldType: 'Select',
                label: 'User Role',
                name: 'select',
                hintText: 'Select a User Role',
                items: userRoles.map(r => ({
                    label: r,
                    value: r
                })),
                validation: ['required', 'string']
            }
        }
    },
    settings: {
        fields: {
            oldPassword: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Enter your current password',
                validation: ['required', 'string']
            },
            newPasswordFirst: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Enter your new password',
                validation: ['required', 'string']
            },
            newPasswordSecond: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Enter your new password again',
                validation: ['required', 'string']
            }
        }
    }
};

export const playlistFields = {
    fields: {
        track: {
            label: 'Track Name',
            name: 'track',
            hintText: 'Enter the track name'
        },
        artist: {
            label: 'Artist Name',
            name: 'artist',
            hintText: 'Enter the artist name'
        },
        album: {
            label: 'Album Name',
            name: 'album',
            hintText: 'Enter the album name'
        },
        label: {
            label: 'Record Label',
            name: 'label',
            hintText: 'Enter the Record Label'
        },
        releaseDate: {
            label: 'Release Date',
            name: 'releaseDate',
            hintText: 'Enter the release date'
        }
    }
};

export default {
    shows,
    users
};
