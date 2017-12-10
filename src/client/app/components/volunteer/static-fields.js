export const volunteerTypeFields = [
    {
        label: 'Monthly All-Station Meeting',
        value: 'all-hands-meeting'
    },
    {
        label: 'Substitute DJ (provide DJ or show and date/time in Comments)',
        value: 'sub-shift'
    },
    {
        label: 'Events Committee',
        value: 'events-committee'
    },
    {
        label: 'Music Library Committee',
        value: 'music-library-committee'
    },
    {
        label: 'Operations Committee',
        value: 'operations-committee'
    },
    {
        label: 'Social Media Committee',
        value: 'social-media-committee'
    },
    {
        label: 'Underwriting Committee',
        value: 'underwriting-committee'
    },
    {
        label: 'Volunteer Committee',
        value: 'volunteer-committee'
    },
    {
        label: 'Web Committee',
        value: 'web-committee'
    },
    {
        label: 'Zine Committee',
        value: 'zine-committee'
    },
    {
        label: 'Freeform Portland Blog',
        value: 'blog-committee'
    },
    {
        label: 'Station Beautification',
        value: 'station-beautification'
    },
    {
        label: 'On-Call Sub Team (OCS)',
        value: 'on-call-sub'
    },
    {
        label: 'Other (provide details in Comments)',
        value: 'other'
    }
];

export const volunteerCategoryFields = [
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP Trained Substitute DJ',
        value: 'sub'
    },
    {
        label: 'An Awesome Volunteer at Large',
        value: 'volunteer'
    }
];

export const selectableHours = Array(200)
    .fill(0)
    .map((o, i) => ({
        label: i + .5,
        value: i + .5 
    }));
