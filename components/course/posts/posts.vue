<template>
  <div class="posts">
    <div class="post" v-for="(post, index) in posts" :key="index">
      <div class="post__header">
        <img
          :src="`https://avatars.dicebear.com/api/initials/${post.Creator.username}.svg?background=%234f46e5`"
          class="user__img"
          alt="user photo"
        />

        <div class="user__info">
          <div class="user__name">{{ post.Creator.username }}</div>
          <div class="post__date">Posted on {{ formatDate(post.CreatedAt) }}</div>
        </div>

        <div class="post__body">{{ post.body }}</div>

        <div class="answers">
          <div class="post__reply" v-for="(answer, index) in post.Replies" :key="index">
            <div class="comment">
              <div class="comment__header">
                <img
                  :src="`https://avatars.dicebear.com/api/initials/${answer.Creator.username}.svg?background=%234f46e5`"
                  alt=""
                  class="comment__usr-img"
                />

                <div class="comment__info">
                  <div class="comment__usr-name">{{ answer.Creator.username }}</div>

                  <div class="comment__date">Отправлено в {{ formatDate(answer.CreatedAt) }}</div>
                </div>
              </div>

              <div class="comment__content">
                {{ answer.body }}
              </div>
            </div>
          </div>
        </div>

        <div class="post__footer">
          <div class="post__reply">
            <img
              :src="`https://avatars.dicebear.com/api/initials/${post.Creator.username}.svg?background=%234f46e5`"
              class="comment__usr-img"
              alt="user photo"
            />

            <div class="comment__info">
              <div class="comment__usr-name">{{ post.Creator.username }}</div>
            </div>
          </div>

          <div class="comment__actions">
            <input
              type="text"
              v-model="newComment"
              class="form-control"
              placeholder="Что вы думаете?"
            />

            <button
              type="button"
              class="btn btn-outline-secondary add-comment__btn"
              @click.prevent="addComment(post.ID, index)"
              :disabled="!newComment"
            >
              Комментарий
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  props: {
    courseID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newComment: "",
      posts: [{}],
    };
  },
  methods: {
    formatDate(datetimeString) {
      if (datetimeString === "Just now") {
        return datetimeString;
      }
      const datetime = new Date(datetimeString);
      const formattedDatetime = datetime.toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDatetime.replace(",", " в");
    },
    addNewCourse(newPost) {
      console.log("newPost: ", newPost);
      this.posts.push(newPost);
    },
    getPosts() {
      this.$axios
        .get(`/api/v1/project/comments/${this.courseID}`)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addComment(postId, index) {
      this.$axios
        .post(`/api/v1/project/replies/`, {
          body: this.newComment,
          commentID: postId,
        })
        .then(({ data }) => {
          this.posts[index].Replies.push({
            Creator: { username: this.$auth.user.username },
            body: this.newComment,
            CreatedAt: "Just now",
          });

          this.newComment = "";
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.post {
  padding: 24px;
  border-radius: 10px;
  border: 1px solid rgba(108, 122, 137, 0.25);
  margin-bottom: 32px;
  width: 100%;
}

.user__img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: gray;
}

.post__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
}

.user__name {
  font-weight: 600;
}

.post__date {
  color: gray;
  font-size: small;
}

.post__body {
  color: $darker-gray;
  margin-bottom: 32px;
}

.comment__usr-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.comment {
  border-radius: 10px;
  border: 1px solid rgba(108, 122, 137, 0.25);
  padding: 12px 16px;
  margin-bottom: 16px;
  width: 100%;
}

.comment__header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.comment__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment__usr-name {
  font-weight: 600;
}

.comment__date {
  font-size: 12px;
  color: gray;
}

.comment__content {
  margin-top: 8px;
}

.post__footer {
  display: flex;
  align-items: center;
  width: 100%;
}

.comment__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2%;
  margin-top: 8px;
  width: 98%;
}

.add-comment__btn {
  color: $main-color;
  border-color: $main-color;
  width: -webkit-fill-available;
  margin-top: 8px;
}


.comment__reply, .answers {
  width: 100%;
}
</style>
