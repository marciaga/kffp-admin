import { daysOfWeek, userRoles, sizes, productTypes} from './utils/constants';
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
                fieldType: 'Wysiwyg',
                name: 'wysiwyg',
                label: 'Description',
                hintText: 'Type here to enter the show\'s description'
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
                validation: ['required', 'string']
            },
            description: {
                fieldType: 'Wysiwyg',
                name: 'wysiwyg',
                label: 'Description',
                hintText: 'Type here to enter the show\'s description'
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
            firstName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'e.g. Laura',
                label: 'First Name'
            },
            lastName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'e.g. Palmer',
                label: 'Last Name'
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
            firstName: {
                label: 'First Name'
            },
            lastName: {
                label: 'Last Name'
            },
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
            firstName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'e.g. Laura',
                label: 'First Name'
            },
            lastName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'e.g. Palmer',
                label: 'Last Name'
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

export const products = {
    new: {
        fields: {
            name: {
                fieldType: 'Text',
                name: 'product_name',
                hintText: 'e.g. Freeform Portland Slipmat',
                label: 'Product Name',
                validation: ['string', 'required']
            },
            price: {
                fieldType: 'Text',
                name: 'price_field',
                hintText: 'e.g. 5.99 (must include decimal)',
                label: 'Price',
                validation: ['price', 'required']
            },
            unitCost: {
                fieldType: 'Text',
                name: 'unit_cost_field',
                hintText: 'e.g. 5.99 (must include decimal)',
                label: 'Unit Cost',
                validation: ['price', 'required']
            },
            description: {
                fieldType: 'TextArea',
                name: 'product_description',
                hintText: 'e.g. A totally rad slipmat.',
                label: 'Product Description',
                validation: ['string', 'required']
            },
            slug: {
                fieldType: 'Text',
                name: 'text',
                label: 'Slug (can\'t be edited later)',
                hintText: 'e.g. mountain-shirt or bottle-opener',
                validation: ['required', 'string']
            },
            image: {
                fieldType: 'FileInput',
                name: 'file',
                label: 'Product Image'
            },
            sortOrder: {
                fieldType: 'Text',
                name: 'sort_order',
                hintText: 'e.g. 9',
                label: 'Sort Order',
                validation: ['string', 'required']
            },
            disabled: {
                fieldType: 'ToggleField',
                name: 'toggle_field',
                label: 'Switch \'On\' to hide product'
            },
            shippable: {
                fieldType: 'ToggleField',
                name: 'toggle_field_shippable',
                label: 'Switch \'Off\' for Not-shippable',
                value: true // default toggled
            },
            weight: {
                fieldType: 'Text',
                name: 'weight_field',
                label: 'Shipping weight'
            },
            isDJPremium: {
                fieldType: 'ToggleField',
                name: 'djpremium_toggle',
                label: 'DJ Premium?'
            },
            sizes: {
                fieldType: 'MultiSelect',
                name: 'sizes_select',
                label: 'Sizes',
                items: sizes
            },
            productType: {
                fieldType: 'Select',
                name: 'product_type',
                label: 'Product Type',
                items: productTypes
            },
            productGuid: {
                fieldType: 'Text',
                name: 'product_guid',
                label: 'Digital Product GUID'
            }
        }
    },
    show: {
        fields: {
            name: {
                label: 'Product Name'
            },
            price: {
                label: 'Price'
            },
            unitCost: {
                label: 'Unit Cost'
            },
            description: {
                label: 'Product Description'
            },
            sortOrder: {
                label: 'Sort Order'
            },
            slug: {
                label: 'slug'
            },
            disabled: {
                label: 'Disabled'
            },
            isDjPremium: {
                label: 'DJ Premium'
            },
            productType: {
                label: 'Type'
            }
        }
    },
    edit: {
        fields: {
            _id: {
                fieldType: 'Hidden'
            },
            name: {
                fieldType: 'Text',
                name: 'product_name',
                hintText: 'e.g. Freeform Portland Slipmat',
                label: 'Product Name',
                validation: ['string', 'required']
            },
            price: {
                fieldType: 'Text',
                name: 'price_field',
                hintText: 'e.g. 5.99 (must include decimal)',
                label: 'Price',
                validation: ['price', 'required']
            },
            unitCost: {
                fieldType: 'Text',
                name: 'unit_cost_field',
                hintText: 'e.g. 5.99 (must include decimal)',
                label: 'Unit Cost',
                validation: ['price', 'required']
            },
            description: {
                fieldType: 'TextArea',
                name: 'product_description',
                hintText: 'e.g. A totally rad slipmat.',
                label: 'Product Description',
                validation: ['string', 'required']
            },
            slug: {
                fieldType: 'Text',
                name: 'text',
                label: 'Slug',
                disabled: true,
                validation: ['required', 'string']
            },
            image: {
                fieldType: 'FileInput',
                name: 'file',
                label: 'Product Image'
            },
            sortOrder: {
                fieldType: 'Text',
                name: 'sort_order',
                hintText: 'e.g. 9',
                label: 'Sort Order',
                validation: ['string', 'required']
            },
            disabled: {
                fieldType: 'ToggleField',
                name: 'toggle_field',
                label: 'Switch \'On\' to hide product'
            },
            shippable: {
                fieldType: 'ToggleField',
                name: 'toggle_field_shippable',
                label: 'Switch \'Off\' for Not-shippable',
                value: true // default toggled
            },
            weight: {
                fieldType: 'Text',
                name: 'weight_field',
                label: 'Shipping weight'
            },
            isDJPremium: {
                fieldType: 'ToggleField',
                name: 'djpremium_toggle',
                label: 'DJ Premium?'
            },
            sizes: {
                fieldType: 'MultiSelect',
                name: 'sizes_select',
                label: 'Sizes',
                items: sizes
            },
            productType: {
                fieldType: 'Select',
                name: 'product_type',
                label: 'Product Type',
                items: productTypes
            },
            productGuid: {
                fieldType: 'Text',
                name: 'product_guid',
                label: 'Digital Product GUID'
            }
        }
    }
};

export const playlistFields = {
    fields: {
        title: {
            label: 'Track Name',
            name: 'title',
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
    users,
    products
};
