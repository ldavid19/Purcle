function getRelativeTime(date) {
    if (!date) {
        return "some time ago";
    }

    var now = new Date(Date.now());

    var time = 0;
    var unit = "";

    var secDiff = now.getSeconds() - date.getSeconds();
    if (secDiff > 0) {
        time = secDiff;
        unit = "second";
    }

    var minDiff = now.getMinutes() - date.getMinutes();
    if (minDiff > 0) {
        time = minDiff;
        unit = "minute";
    }
    
    var hrDiff = now.getHours() - date.getHours();
    if (hrDiff > 0) {
        time = hrDiff;
        unit = "hour";
    }

    var monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff > 0) {
        time = monthDiff;
        unit = "month";
    }

    var yearDiff = now.getFullYear() - date.getFullYear();
    if (yearDiff > 0) {
        time = yearDiff;
        unit = "year"
    }

    if (time === 0) {
        return "just now"
    } else if (time !== 1) {
        unit += "s"
    }

    return time + " " + unit + " ago";
}

function formatPost(post) {
    // the data is formatted very inconsistently throughout each component so this function fixes that
    
    //assume post pulled from server is formatted this way:
    /* post = {
        post_id:,
        post_topic:,
        post_type:,
        user_id:,
        post_is_anonymous:,
        post_title:,
        post_content:,
        post_time:,
        post_score:
    };
    */

    //reformat post into simpler keys
    const newPost = {
        id: post.post_id,
        title: post.post_title,
        content: post.post_content,
        topic: post.post_topic,
        type: post.post_type,
        user: post.user_id,
        anon: post.post_is_anonymous,
        date: post.post_time,
        score: post.post_score
    }

    return newPost;
}

function formatUser(user) {
    // the data is formatted very inconsistently throughout each component so this function fixes that
    
    //assume user pulled from server is formatted this way:
    /* user = {
        profile_name: randString(3, false, false),
        user_profile_picture: randImg(),
        user_bio: randString(15 + rand(10), true, true),
        user_followers_count: rand(500),
        user_following_count: rand(500),
        allow_only_followed_users: rand(2),
        first_name: randWord(),
        last_name: randWord(),
        user_email: randString(3, false, true) + "com"
    }
    */

    //reformat user into simpler keys
    //add followers list and following list??
    const newUser = {
        username: user.profile_name,
        pfp: user.user_profile_picture,
        bio: user.user_bio,
        follower_count: user.user_followers_count,
        following_count: user.user_following_count,
        private: user.allow_only_followed_users,
        first: user.first_name,
        last: user.last_name,
        email: user.user_email
    }

    return newUser;
}

export { getRelativeTime, formatPost, formatUser };