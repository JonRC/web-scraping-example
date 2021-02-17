const axios = require('axios')
const { JSDOM } = require('jsdom')

const searchWord = 'javascript'
const baseURL = 'https://pt.wikipedia.org'
const url = `${baseURL}/w/index.php?search=${searchWord}&title=Especial:Pesquisar&profile=advanced&fulltext=1&ns0=1`

axios.get(url)
  .then(axiosResponse => {
    const html = axiosResponse.data
    const dom = new JSDOM(html)
    const document = dom.window.document

    const listItemCollection = document.getElementsByClassName('mw-search-results')[0].children
    const listItems = [...listItemCollection]
    const results = listItems.map(listItem => {
      const title = listItem.getElementsByClassName('mw-search-result-heading')[0].textContent
      const url = listItem.getElementsByTagName('a')[0].getAttribute('href')
      return {
        title: title.trim(),
        url: baseURL + url
      }
    })

    console.log(results)
  })