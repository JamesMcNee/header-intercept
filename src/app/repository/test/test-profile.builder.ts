import { Profile } from 'src/app/domain/profile.model';

export abstract class TestProfileBuilder {

    public static anExampleProfile(): Profile {
        return {
            id: 'PROFILE_ID',
            name: 'PROFILE_NAME',
            enabled: true,
            urlMatches: [],
            requestHeaders: []
        }
    }

    public static anExampleFullProfile(): Profile {
        return {
            id: 'PROFILE_ID',
            name: 'Search engine',
            enabled: true,
            urlMatches: [
                {
                    enabled: true,
                    regex: 'http://google.com'
                },
                {
                    enabled: true,
                    regex: 'http://bing.com'
                },
                {
                    enabled: false,
                    regex: 'http://ask.com'
                }
            ],
            requestHeaders: [
                {
                    id: '1',
                    enabled: true,
                    name: 'enable-super-search',
                    value: 'true'
                },
                {
                    id: '2',
                    enabled: true,
                    name: 'allow-random-results',
                    value: 'false'
                },
                {
                    id: '3',
                    enabled: false,
                    name: 'cause-spontanious-combustion',
                    value: 'true'
                }
            ]
        }
    }
}