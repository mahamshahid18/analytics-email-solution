'use strict';

import { Helper } from '../utilities/helpers';

class QueryTemplates {
    static getTransformerQuery(email) {
        return `function main() {
            return join(
                Events(
                    {
                        from_date: "${Helper.getFormattedDate(new Date(), true)}",
                        to_date: "${Helper.getFormattedDate(new Date())}",
                        event_selectors: [
                            { "event": "TransformViaWeb" },
                            { "event": "TransformViaAPI" }
                        ]
                    }
                ),
                People()
            ).filter(
                function (tuple) {
                    return tuple.event &&
                        tuple.user
                        && tuple.user.properties.$email == "${email}";
                }
            ).reduce(mixpanel.reducer.count());
        }`;
    }

    static getSDKQuery(email) {
        return `function main() {
            return join(
                Events(
                    {
                        from_date: "${Helper.getFormattedDate(new Date(), true)}",
                        to_date: "${Helper.getFormattedDate(new Date())}",
                        event_selectors: [
                            { "event": "SDKGenerated_API" },
                            { "event": "SDKGenerated_WEBSITE" }
                        ]
                    }
                ),
                People()
            ).filter(
                function(tuple) {
                    return tuple.event && tuple.event.properties.$username == "${email}";
                }
            );
        }`;
    }

    static getDocsQuery(email) {
        return `function main() {
            return join(
                Events(
                    {
                        from_date: "${Helper.getFormattedDate(new Date(), true)}",
                        to_date: "${Helper.getFormattedDate(new Date())}",
                        event_selectors: [
                            { "event":"DocsViewed" }
                        ]
                    }
                ),
                People()
            ).filter(
                function(tuple) {
                    return tuple.event && tuple.event.properties.$username == "${email}";
                }
            );
        }`;
    }
}

export { QueryTemplates };
