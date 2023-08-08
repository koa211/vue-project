<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePiniaStore } from '@/stores/session';

const store = usePiniaStore()
console.log(store.session)

const greeting = ref('Spider Monkey')

//constants for labels
const bookName = ref('')
const bookId = ref('')
const bookAuthor = ref('')
const bookPrice = ref('')
const bookType = ref('')

const newBookName = ref('')
const newAuthor = ref('')
const newBookId = ref('')
const newPrice = ref('')
const newType = ref('')

//pagination
//constant for book list reference
const books = ref([])
const filter = ref({
  page: 0,
  count: 3,
  totalPages: 0,
  searchName: '',
  searchAuthor: '',
})

//ROUTERS
const router = useRouter()
const route = useRoute()

//search
const searchBoxName = ref('')
const searchBoxAuthor = ref('')

//bookTypes
const bookTypes = ref({})
const typeSelect = ref('')

async function getType() {
  const res = await fetch(`http://localhost:8082/api/books/type`);
  const finalRes = await res.json();
  //extract values
  console.log(finalRes)
  bookTypes.value = finalRes;
  console.log(bookTypes)
}

async function getAllBook() {
  console.log(filter.value.searchName)
  const res = await fetch(`http://localhost:8082/api/books?page=${filter.value.page}&size=${filter.value.count}&searchName=${filter.value.searchName}&searchAuthor=${filter.value.searchAuthor}`);
  const finalRes = await res.json();
  router.replace({ path: '/day-1', query: filter.value});
  //extract values
  books.value = finalRes.library;
  filter.value.totalPages = finalRes.totalPages;
}

async function addNewBook() {
  //convert type to typeId
  let type = bookTypes.value.find(n => n.bookGenreName === typeSelect.value);
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: bookId.value, name:bookName.value, author:bookAuthor.value, price:bookPrice.value, genId:type.bookGenreId, genName:typeSelect.value})
  };
  console.log(requestOptions)
  await fetch("http://localhost:8082/api/books/add", requestOptions)
    .then(response => {
      if (response.status === 200) {
        alert('Add Success')
      }
    })

  await getAllBook()
}

async function delNewBook(index) {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: index
  };

  await fetch("http://localhost:8082/api/books/del/" + index, requestOptions)
    .then(response => {
      if (response.status === 200) {
        alert('Delete Success')
      }
    })

  await getAllBook()
}

async function updNewBook() {
  let type = bookTypes.value.find(n => n.bookGenreName === newType.value);
  console.log(type)
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: newBookId.value, name:newBookName.value, author:newAuthor.value, price:newPrice.value, genId:type.bookGenreId, genName:newType.value})
  };
  console.log(requestOptions)

  await fetch("http://localhost:8082/api/books/upd", requestOptions)
    .then(response => {
      if (response.status === 200) {
        alert('Update Success')
      }
    })

  await getAllBook()
}

async function backPage() {
  if (filter.value.page === 0) {
    return 
  }
  else {
    filter.value.page -= 1
    router.replace({ path: '/day-1', query: filter.value})
    await getAllBook()
  }
}

async function nextPage() {
  if (filter.value.page === filter.value.totalPages - 1) {
    return 
  }
  else {
    filter.value.page += 1
    router.replace({ path: '/day-1', query: filter.value})
    await getAllBook()
  }
}

async function findBook() {
  filter.value.searchName = searchBoxName.value
  filter.value.searchAuthor = searchBoxAuthor.value
  console.log(filter.value.searchName)
  router.replace({ path: '/day-1', query: filter.value})
  await getAllBook()
}

// function addBook(newId) {
//   console.log(newId)
//   if (books.value.findIndex(b => b.id === newId) < 0) {
//     let jsonValue = JSON.stringify({id: bookId.value, name:bookName.value, author:bookAuthor.value, price:bookPrice.value})
//     console.log(jsonValue) //post fetch and pass jsonValue
//     // books.value.push({ id: bookId.value, name: bookName.value, author: bookAuthor.value, price: bookPrice.value})
//   }
// }

// function removeBook(index) {
//   books.value = books.value.filter((b) => b != index)
// }

function modifyBook(bookId) {
  let index = books.value.findIndex(u => {
    return u.id === bookId;
  });
  console.log(index)
  newBookName.value = books.value[index].name
  newAuthor.value = books.value[index].author
  newBookId.value = books.value[index].id
  newPrice.value = books.value[index].price
  newType.value = bookTypes.value[index].bookGenreName
}

// function update(bookId) {
//   let index = books.value.findIndex(u => {
//     return u.id === bookId;
//   });
//   console.log(newBookName)
//   books.value[index].name = newBookName.value
//   books.value[index].author = newAuthor.value
// }

onMounted(() => {
  getAllBook()
  getType()
})

</script>

<template>
  <h3 class="login" v-show=!(store.session)>
    PLEASE LOGIN
  </h3>
<div v-show=store.session>
  <div class="page">
    <h1>Book Library</h1>
    <button class="topright" @click="store.signOut()">SignOut</button>
  </div>
  <p class="greeting">{{ greeting }}</p>
  <!--ask user for input-->
  <form @submit.prevent="addNewBook()">
    <label>Book id is: </label>
    <input class="text-field" v-model.trim="bookId">
    <label>  Book name is: </label>
    <input class="text-field" v-model.trim="bookName">
    <label>  Book author is: </label>
    <input class="text-field" v-model.trim="bookAuthor">
    <label>  Book price is: </label>
    <input class="text-field" v-model.trim="bookPrice">
    <label>  Book type is: </label>
    <select v-model="typeSelect">
      <option disabled value="">Please select one</option>
      <option v-for="type in bookTypes" v-bind:key="type">
        {{ type.bookGenreName }}
      </option>
    </select>

    <button>Add Book</button>
  </form>

  <!--input labels for modifying book lists in library-->
  <label>Bood id is: {{ newBookId }}</label>
  <label>  Updated book name is:</label>
  <input class="text-field" v-model.trim="newBookName">
  <label>  Updated book author is:</label> 
  <input class="text-field" v-model.trim="newAuthor">
  <label>  Updated book price is:</label> 
  <input class="text-field" v-model.trim="newPrice">
  <label>  Updated Book type is: </label>
    <select v-model="newType">
      <option disabled value="">Please select one</option>
      <option v-for="type in bookTypes" v-bind:key="type">
        {{ type.bookGenreName }}
      </option>
    </select>
  <button @click="updNewBook()">(update)</button>

  <!-- search labels to look for books in library -->
  <div>
    <input v-model="searchBoxName" placeholder="book filter"> {{  }}
    <input v-model="searchBoxAuthor" placeholder="author filter"> {{  }}
    <button @click="findBook()">(search)</button>
  </div>
  
    <!--print values in list order-->
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>BookName</th>
          <th>Author</th>
          <th>Price</th>
          <th>Type/Genre</th>
          <th>Functions</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.id }}</td>
            <td>{{ book.name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.genName }}</td>
            <td>
            <button @click="delNewBook(book.id)">(delete)</button>
            <button @click="$event => modifyBook(book.id)">(modify)</button>
            </td>
          </tr>
    </tbody>
    </table>
  <button @click="backPage()">Back</button> {{ filter.page }} <button @click="nextPage()">Next</button>
</div>
</template>

<style>
.login {
  text-align:center;
  color: red;
  font-weight: bold;
  font-size: 100px;
}

table {
  display: table;
  border-collapse: separate;
  border-spacing: 20px;
  border-color: gray;
  width: 100%;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.greeting {
  color: red;
  font-weight: bold;
}

.b {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}

.text-field {
  width:125px;
}

.topright {
  position: absolute;
  top: 100px;
  right: 200px;
}
</style>
