import { StrictMode } from "react";
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
    console.log(createRandUser());
    return res;
}

async function getUser() {
    var user = createRandUser();

    return user;
}

function rand(max) {
    return Math.floor(Math.random() * max);
}

function randWord() {
    const wordList = ["science","speak","remove","truck","happy","main","broke","calm","alive","wrote",
    "act","fox","back","prize","forward","report","over","health","serve","nearer",
    "especially","apple","indeed","spent","finally","colony","acres","operation","welcome","walk",
    "constantly","social","excellent","shirt","worried","bear","him","model","tip","during",
    "twice","suit","factory","film","hurt","neck","education","listen","noon","paid",
    "met","production","mainly","system","harbor","vegetable","name","pilot","rise","period",
    "forty","ill","how","sudden","plus","typical","pink","across","grandmother","scene",
    "mainly","driver","refused","jungle","end","themselves","south","breathing","engineer","sick",
    "ourselves","badly","claws","purpose","system","rope","second","having","interior","city",
    "signal","here","living","shoulder","according","just","daughter","sail","gray","remarkable",
    "valley","choice","cookies","shape","forty","soap","vessels","teach","underline","appearance",
    "soft","walk","interior","shelf","able","behavior","without","deep","sad","political",
    "saw","diagram","laugh","shall","salt","led","than","flight","knowledge","diagram",
    "advice","find","leg","record","position","found","cookies","dance","game","strength",
    "mail","ranch","pine","once","tobacco","carefully","value","quick","package","natural",
    "toy","divide","include","simply","powder","bare","affect","five","climate","thank",
    "naturally","rising","gone","fire","broad","wore","zero","recent","beginning","expression",
    "row","wonder","tell","lie","cover","sentence","choice","book","tax","death",
    "instead","surrounded","felt","pile","period","suggest","stock","market","only","location",
    "each","worth","die","almost","tightly","everyone","correctly","telephone","carefully","dust",
    "swimming","reader","atmosphere","brown","nails","thy","willing","idea","storm","war",
    "on","say","special","fighting","mistake","prove","between","ready","rose","headed",
    "glad","north","complete","repeat","palace","hurried","muscle","swept","house","coming",
    "entirely","nervous","partly","such","soldier","coal","band","hungry","solution","hay",
    "root","chamber","stay","just","table","sides","entire","paid","present","society",
    "produce","smooth","glass","nearer","account","effort","did","fewer","load","function",
    "dozen","consist","slipped","map","busy","composition","square","youth","minerals","leaf",
    "band","machinery","basket","habit","alone","slept","far","exact","wheat","limited",
    "tide","influence","safety","remove","order","product","natural","noon","peace","lift",
    "development","dug","remove","condition","shells","further","needs","transportation","even","die",
    "report","paper","work","taken","brave","sick","state","sent","tent","forward"];

    return wordList[rand(wordList.length)];
}

function randString(max, spaces, period) {
    var str = ""
    for (var i = 0; i < max; i++) {
        str += randWord();

        if (spaces && i < max - 1) {
            str += " ";
        }
    }

    if (period) {
        str += "."
    }

    return str;
}

function randImg() {
    const tartaglia = "https://i1.sndcdn.com/artworks-veo6gasHptURSGgN-wpUwfg-t500x500.jpg"
    const dan = "https://static.wikia.nocookie.net/valorant/images/1/1a/Epilogue_Dabbing_Dan_Spray.png"
    const qiqi = "https://i.imgur.com/OQfRjgN.png"
    const froge = "https://i.kym-cdn.com/entries/icons/mobile/000/020/016/wednesdaymydudeswide.jpg"

    const images = [tartaglia, dan, qiqi, froge];

    return images[rand(images.length)];
}

function createRandPost(id) {
    const topics = ["Pokemon", "Plushies", "Boba", "Purdue", "pcmasterrace", "Bingsu", "Fruit", "AskPurcle", "Wholesome", "Eyebleach"];
    //types = 0 (text post) or 1 (image post)
    var content = randString(30 + rand(20), true, true)
    var postType = rand(2);

    if (postType) {
        content = randImg();
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
        user_id: randString(2 + rand(2), false, false),
        post_is_anonymous: rand(2),
        post_title: randString(3 + rand(3), true, false),
        post_content: content,
        post_time: randDate(),
        post_score: rand(900)
    };

    return newPost;
}

function createRandUser() {
    /*
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    profile_name = models.CharField(max_length=100, null=True)
    user_profile_picture = models.ImageField(default='default.jpg', upload_to='profile_images')
    user_bio = models.TextField(max_length=500)
    user_followers_count = models.FloatField(default=0, null=False)
    user_following_count = models.FloatField(default=0, null=False)
    allow_only_followed_users = models.BooleanField(default=False)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    user_email = models.CharField(max_length=200, null=False)
    */


    var user = {
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

    return user;
}

export { getPost, getUser };