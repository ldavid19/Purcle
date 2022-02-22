import NewPost from "../components/Post/NewPost"

function getReq() {
    console.log("oh")
}

async function getPost() {
    var res = [];

    for (var i = 0; i < 100; i++) {
        res.push(createRandPost(i));
    }

    //console.log(res);
    return res;
}

function createRandPost(id) {
    const topics = ["Pokemon", "Plushies", "Boba", "Purdue", "pcmasterrace", "Bingsu", "Fruit", "AskPurcle", "Wholesome", "Eyebleach"];
    var title = "Post Title #" + id;
    //types = 0 (text post) or 1 (image post)
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    var content = "";

    const tartaglia = "https://i1.sndcdn.com/artworks-veo6gasHptURSGgN-wpUwfg-t500x500.jpg"
    const dan = "https://static.wikia.nocookie.net/valorant/images/1/1a/Epilogue_Dabbing_Dan_Spray.png"
    const qiqi = "https://i.imgur.com/OQfRjgN.png"

    const images = [tartaglia, dan, qiqi]

    var rand = (max) => {
        return Math.floor(Math.random() * max);
    }

    var postType = rand(2);

    if (postType) {
        content = images[rand(images.length)];
    } else {
        content = text;
    }

    var randDate = () => {
        var start = new Date(Date.now());
        var newHr = start.getHours() - rand(5) | 0;

        start.setHours(newHr);
        return start;
    }

    var newPost = {
        post_id: id,
        post_topic: topics[rand(topics.length)],
        post_type: postType,
        user_id: id,
        post_is_anonymous: rand(2),
        post_title: title,
        post_content: content,
        post_time: randDate()
    };

    return newPost;
}

export { getPost };