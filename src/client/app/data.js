import { daysOfWeek, userRoles } from './utils/constants';
// mapping of data model + form fields
const shows = {
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
                name: 'autocomplete_field',
                label: 'Select a DJ',
                hintText: 'Type a name'
            },
            dayOfWeek: {
                fieldType: 'Select',
                label: 'Day of the Week',
                name: 'select',
                hintText: 'Select a Day of the Week',
                items: daysOfWeek.map(d => ({
                    label: d,
                    value: d
                }))
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
                label: 'Active Show?',
                value: true // default toggled
            },
            slug: {
                fieldType: 'Text',
                label: 'Slug',
                hintText: 'Enter the show slug'
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
                label: 'Show Name'
            },
            users: {
                fieldType: 'AutoCompleteField',
                name: 'autocomplete_field',
                label: 'Select a DJ',
                hintText: 'Type a name'
            },
            dayOfWeek: {
                fieldType: 'Select',
                label: 'Day of the Week',
                name: 'select',
                hintText: 'Select a Day of the Week',
                items: daysOfWeek.map(d => ({
                    label: d,
                    value: d
                }))
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
                label: 'Active Show?',
                value: true // default toggled
            },
            slug: {
                fieldType: 'Text',
                label: 'Slug',
                disabled: true
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
                label: 'DJ Name'
            },
            email: {
                fieldType: 'Text',
                name: 'email_field',
                hintText: 'Enter Email Address',
                label: 'Email'
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
                }))
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
                label: 'DJ Name'
            },
            email: {
                fieldType: 'Text',
                name: 'email_field',
                hintText: 'Enter Email Address',
                label: 'Email'
            },
            role: {
                fieldType: 'Select',
                label: 'User Role',
                name: 'select',
                hintText: 'Select a User Role',
                items: userRoles.map(r => ({
                    label: r,
                    value: r
                }))
            }
        }
    },
    settings: {
        fields: {
            oldPassword: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Enter your current password'
            },
            newPasswordFirst: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Enter your new password'
            },
            newPasswordSecond: {
                fieldType: 'Text',
                name: 'password',
                hintText: 'Enter your new password again'
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
