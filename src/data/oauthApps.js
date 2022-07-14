
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";

import Profile1 from "assets/img/team/profile-picture-1.jpg"
import Profile2 from "assets/img/team/profile-picture-2.jpg"
import Profile3 from "assets/img/team/profile-picture-3.jpg"
import Profile4 from "assets/img/team/profile-picture-4.jpg"
import { TwitchIcon } from "components/BrandIcons";
import { TwitterIcon } from "components/BrandIcons";

export default [
    {
        "id": uuidv4(),
        "appLogo": Profile1,
        "verified": true,
        "status": "active",
        "appName": "Github",
        "appURL": "github.com",
        "dateCreated": moment().format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "appLogo": TwitterIcon,
        "verified": true,
        "status": "active",
        "appName": "Twitter",
        "appURL": "www.twitter.com",
        "dateCreated": moment().subtract(2, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "verified": true,
        "status": "active",
        "appName": "Youtube",
        "appURL": "www.youtube.com",
        "dateCreated": moment().subtract(2, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "verified": true,
        "status": "active",
        "appLogo": Profile4,
        "appName": "Dework",
        "appURL": "www.app.dework.xyz",
        "dateCreated": moment().subtract(3, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "verified": false,
        "status": "inactive",
        "appLogo": Profile3,
        "appName": "Discord",
        "appURL": "example@themesberg.com",
        "dateCreated": moment().subtract(4, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "verified": false,
        "status": "pending",
        "appName": "Discourse",
        "appURL": "www.discourse.com",
        "dateCreated": moment().subtract(5, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "AppLogo": Profile2,
        "verified": false,
        "status": "pending",
        "appName": "Dropbox",
        "appURL": "www.dropbox.com",
        "dateCreated": moment().subtract(5, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "appLogo": TwitchIcon,
        "verified": false,
        "status": "suspended",
        "appName": "Twitch",
        "appURL": "www.twitch.com",
        "dateCreated": moment().subtract(5, "days").format("DD MMM YYYY"),
    },
    {
        "id": uuidv4(),
        "verified": false,
        "status": "suspended",
        "appName": "Linkedin",
        "appURL": "www.linkedin.com",
        "dateCreated": moment().subtract(6, "days").format("DD MMM YYYY"),
    }
]