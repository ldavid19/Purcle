from django.db import models
from django.contrib.auth.models import User

User._meta.get_field('email').blank = False

class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    profile_name = models.CharField(max_length=100, null=True)
    user_profile_picture = models.ImageField(default='default.jpg', upload_to='profile_images', blank=True, null=True)
    user_bio = models.TextField(max_length=500)
    user_followers_count = models.FloatField(default=0, null=False)
    user_following_count = models.FloatField(default=0, null=False)
    allow_only_followed_users = models.BooleanField(default=False)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    user_email = models.CharField(max_length=200, null=False)

    def __str__(self):
        return self.profile_name

    def delete_user(self):
        self.delete()

    def get_follower_count(self):
        return self.user_profile_picture
    
    def get_following_count(self):
        return self.user_following_count

    def get_bio(self):
        return self.user_bio

    def get_first_name(self):
        return self.first_name

    def get_last_name(self):
        return self.last_name

    def get_profile_pic(self):
        return self.user_profile_picture
    
    def get_email(self):
        return self.user_email

    def get_allow_only_followed_users(self):
        return self.allow_only_followed_users

    def set_allow_only_followed_users(self, boolean):
        self.allow_only_followed_users = boolean


class Topic(models.Model):      # created by Nicole
    topic_id = models.CharField(max_length=100, primary_key=True, unique=True)   # topic_id replaces the automatically created id
    topic_num_followers = models.FloatField()

    # deletes topic, any references to that topic are changed to null
    # this is for testing purposes and is not expected to be used
    def delete_topic(self):
        self.delete()

    def increment_topic_num_followers(self):
        self.topic_num_followers = self.topic_num_followers + 1
        self.save()

    def decrement_topic_num_followers(self):
        self.topic_num_followers = self.topic_num_followers - 1
        self.save()

    # Topic Getters
    def get_topic_id(self):
        return self.topic_id
    def get_topic_num_followers(self):
        return self.topic_num_followers

# assumes that post_topic exists
class Post(models.Model):       # created by Nicole
    # Post.id is created automatically
    post_topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True) # if the Topic is deleted (this should never 
                                                                                # happen, but in case it does), the Post's
                                                                                # Topic is set to null
    post_type = models.IntegerField()   # 0 being a text post, 1 being a photo post
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)   # if the UserProfile is deleted, so will the Post
    post_is_anonymous = models.BooleanField()
    post_title = models.CharField(max_length=100)
    post_content = models.CharField(max_length=500) # either the text field for a text post, or the photo for a photo post
    post_time = models.DateTimeField(auto_now=False, auto_now_add=True) # time is set on initial creation

    # deletes post, any references to that post in Reaction or Comment are also deleted
    def delete_post(self):
        self.delete()

    # Post Getters
    def get_post_id(self):
        return self.id
    def get_post_topic(self):
        return self.post_topic
    def get_post_type(self):
        return self.post_type
    def get_user_id(self):
        return self.user_id
    def get_post_is_anonymous(self):
        return self.post_is_anonymous
    def get_post_title(self):
        return self.post_title
    def get_post_content(self):
        return self.post_content
    def get_post_time(self):
        return self.post_time

# does not check if the user has already reacted to post
class Reaction(models.Model):                 # created by Nicole
    # Reaction.id is created automatically
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)   # if the UserProfile is deleted, so will the Reaction
    reaction_type = models.IntegerField()   # 0 for like, 1 for dislike
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)   # if the Post is deleted, so will the Reaction

    # Reaction Getters
    def get_reaction_id(self):
        return self.id
    def get_user_id(self):
        return self.user_id
    def get_reaction_type(self):
        return self.reaction_type
    def get_post_id(self):
        return self.post_id

class Comment(models.Model):                # created by Nicole
    #Comment.id is created automatically
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)  # if the UserProfile is deleted, so will the Comment
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)         # if the Post is deleted, so will the Comment
    comment_content = models.CharField(max_length=500)
    comment_created_date = models.DateTimeField(auto_now=False, auto_now_add=True) # time is set on initial creation
    comment_is_anonymous = models.BooleanField() # I added this, wasn't on design doc
    # comment_parent_id = models.ForeignKey(Comment, on_delete=models.CASCADE)    # allows for comment threads
    # ^ this isn't actually required so I'm going to ignore it for now
    # Reactions for Comments also aren't required, so I'm ignoring that as well

    # Comment Getters
    def get_user_id(self):
        return self.user_id
    def get_post_id(self):
        return self.post_id
    def get_comment_content(self):
        return self.comment_content
    def get_comment_created_date(self):
        return self.comment_created_date
    def get_comment_is_anonymous(self):
        return self.comment_is_anonymous
    # def get_comment_parent_id(self):
        # return self.comment_parrent_id
