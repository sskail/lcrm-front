<template>
  <div>

    <b-row>
      <b-col class="mb-4"><h4>Индикатор завершенности проекта</h4>
        <ProgressBar :completion-percentage="progressValue"/>
      </b-col>
    </b-row>

    <b-row>
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        Вы можете удалить задание двойным тапом!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </b-row>

    <b-row>
      <b-col class="mb-4">
        <b-card class="shadow" no-body>
          <b-card-header class="py-3">
            <b-card-title>
                        <span>
                        {{ board.name }}; {{ board.description }}
                      </span>
              <button
                type="button"
                class="float-end btn add-task-btn"
                data-toggle="modal"
                data-target="#taskModal">Добавить задачу
              </button>
            </b-card-title>
          </b-card-header>
          <b-card-body class="card-body">


            <TaskBoard
              :board="board"
              :remove-func="clickHandler"
              @changeBoard="changeBoard"/>

          </b-card-body>
        </b-card>

      </b-col>
    </b-row>
    <b-row>
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        Вы можете оценить вклад своего товарища после выполнения работы
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </b-row>
    <CreateTask
      id="taskModal"
      :boardId="curBoard"
      :projectUsers="projectUsers"
      @refresh="GetBoard"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        title: '',
        status: 'to-do',
        user_id: this.$auth.$storage.getUniversal('user').id,
        board_id: undefined,
      },
      board: {
        id: undefined,
        name: undefined,
        description: undefined,
        lists: [{}, {}, {}, {}],
      },
      fields: [
        'name', 'title', 'link'
      ],
      curBoard: 1,
      count: 0,
      newStatus: undefined,
      editItem: undefined
    }
  },

  methods: {
    async Ajax(items, status) {
      await this.setAjaxData(items, status);
      await this.sendAjax();
    },
    async GetBoard() {
      try {
        console.log('get board info')
        const {data} = await this.$axios.get('/api/v1/project/board/' + this.curBoard)
        this.board.id = data.data.ID;
        this.form.board_id = data.data.id;
        this.board.name = data.data.name;
        this.board.description = data.data.description;
        this.formatData(data.data.Tasks);

      } catch (e) {
        console.log("GetBoard Error " + e.toLocaleString())
      }
    },


    changeBoard(data) {
      this.board.lists[data.position].items = data.items
      this.count++

      // console.log('data ', data.items)
      // console.log('item ', this.board.lists[data.listId])

      if (this.count === 1) this.Ajax(data.items, data.listId);
    },

    clickHandler(id) {
      this.$axios.delete('/api/v1/project/board/task/' + id).then(() => {
        this.GetBoard()
        // this.$toast.success(`Задание удалено`, {duration: 3000})
      })
    },

    formatData(data) {
      // Создание пустых массивов для каждого статуса задач
      const toDoTasks = [];
      const doingTasks = [];
      const doneTasks = [];
      const deployTasks = [];

      // Перебор задач и добавление их в соответствующие массивы статусов
      data.forEach(task => {
        switch (task.status) {
          case "to-do":
            toDoTasks.push(task);
            break;
          case "doing":
            doingTasks.push(task);
            break;
          case "done":
            doneTasks.push(task);
            break;
          case "deploy":
            deployTasks.push(task);
            break;
          default:
            break;
        }
      });
      this.board.lists = [
        {
          id: "to-do",
          position: 0,
          name: "Нужно сделать",
          items: toDoTasks
        },
        {
          id: "doing",
          position: 1,
          name: "В процессе",
          items: doingTasks
        },
        {
          id: "done",
          position: 2,
          name: "Сделано",
          items: doneTasks
        },
        {
          id: "deploy",
          position: 3,
          name: "Сделано и работает",
          items: deployTasks
        }
      ];


    },
    onSubmit() {
      console.log(this.form)
      this.$axios.post('/api/v1/manager/tasks', this.form
      ).then((response) => {
        this.GetBoard()
        this.$toast.success(`Задание добавлено`, {duration: 3000})

      })

    },
    sendAjax() {
      return new Promise((resolve, reject) => {
        console.log('sendAjax')
        this.$axios.patch('/api/v1/project/board/task/' + this.editItem.ID, {
          name: this.editItem.name,
          title: this.editItem.title,
          boardID: this.board.id,
          status: this.newStatus,
        }).then((response) => {
          // this.$toast.success(response.data.massage, {duration: 700})
          this.newStatus = undefined;
          this.editItem = undefined;
          this.count = 0;
          resolve('resolved');
        })
          .catch((err) => {
            // this.$toast.error(err, {duration: 1000});
            reject(err)
          })


      });
    },
    setAjaxData(items, status) {
      return new Promise((resolve) => {
        let count = 0;
        items.forEach(element => {
          if (element.status !== status) {
            this.editItem = element;
            this.newStatus = status;
            element.status = status
            count++
            // console.log(this.editItem.name, '  ', this.editItem.id)
            // console.log(this.newStatus)
            resolve('resolved')
          }
        });
        if (count === 0) this.count = 0;
      });
    }

  },
  components: {
    CreateTask: () => import("@/components/Task/CreateTask.vue"),
    ProgressBar: () => import("@/components/Task/ProggresBar.vue"),
  },
  mounted() {
    this.GetBoard()
  },
  props: {
    projectUsers: {type: Array, default: null, required: false}
  },
  computed: {
    progressValue() {
      console.log(this.board.lists)

      const emptyLists = JSON.stringify([{}, {}, {}, {}]);
      const currentLists = JSON.stringify(this.board.lists);

      if (currentLists !== emptyLists) {
        let totalCount = 0; // Общее количество элементов во всех колонках
        let lastColumnCount = 0; // Количество элементов в последней колонке

        for (const column of this.board.lists) {
          totalCount += column.items.length; // Добавляем количество элементов в текущей колонке к общему количеству

          if (column.id === "deploy") {
            lastColumnCount = column.items.length; // Сохраняем количество элементов в последней колонке
          }
        }
        const res = lastColumnCount / totalCount *100

        if (res===100){
          this.$emit('projectComplete',true)
        }
        else {
          this.$emit('projectComplete',false)

        }
        return res;

      } else {
        return 0;
      }
    }
  }
}
</script>


<style>
/*.alert-dismissible .close {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  right: 0;*/
/*  z-index: 2;*/
/*  padding: 1rem 1.25rem;*/
/*  color: inherit;*/
/*}*/

/*button.close {*/
/*  padding: 0;*/
/*  background-color: transparent;*/
/*  border: 0;*/
/*}*/

/*.close {*/

/*  float: right;*/
/*  font-size: 1.5rem;*/
/*  font-weight: 700;*/
/*  line-height: 1;*/
/*  color: #000;*/
/*  text-shadow: 0 1px 0 #fff;*/
/*  opacity: .5;*/
/*}*/
</style>
