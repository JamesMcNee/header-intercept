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
}