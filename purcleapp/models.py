from django.db import models

class User(models.Model):       # dummy class made for testing, Nicole
    user_email = models.CharField(max_length=50)

    def delete_user(self):
        self.delete()

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
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)   # if the User is deleted, so will the Post
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

