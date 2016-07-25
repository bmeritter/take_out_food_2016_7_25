// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

function calculatePrice(selectedItems) {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
  let message = document.getElementById('message')
  let returnString = bestCharge(selectedItems);
  console.log(returnString)
  let messageNote = document.createTextNode(returnString)

  let div = document.createTextNode('div')
  div.appendChild(messageNote)
  message.appendChild(div)
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能


}

function showData() {
  showPromotions();
  showItems();
}

function showPromotions() {
  promotion = loadPromotions();
  let div = document.getElementById("promotions");
  let table = document.createElement("table");
  div.appendChild(table)

  let tr = document.createElement("tr");

  let typeId = document.createElement("td");
  let typeNote = document.createTextNode('type');
  typeId.appendChild(typeNote)
  tr.appendChild(typeId)

  let idTd = document.createElement("td");
  let idNote = document.createTextNode('ids');
  idTd.appendChild(idNote)
  tr.appendChild(idTd)

  table.appendChild(tr)
  for(let item of promotion) {
    let tr = document.createElement("tr");

    let typeId = document.createElement("td");
    let typeNote = document.createTextNode(item.type);
    typeId.appendChild(typeNote)
    tr.appendChild(typeId)

    if(item.items) {

      let idTd = document.createElement("td");
      let idNote = document.createTextNode(item.items);
      idTd.appendChild(idNote)
      tr.appendChild(idTd)
    }

    table.appendChild(tr)

  }
}

function showItems() {
  allItems = loadAllItems();
  let div = document.getElementById("items");
  let table = document.createElement("table");
  div.appendChild(table)

  let tr = document.createElement("tr");

  let idTd = document.createElement("td");
  let id = document.createTextNode('id');
  idTd.appendChild(id)
  tr.appendChild(idTd)

  let nameTd = document.createElement("td");
  let name = document.createTextNode('name');
  nameTd.appendChild(name)
  tr.appendChild(nameTd)

  let priceTd = document.createElement("td");
  let price = document.createTextNode('price');
  priceTd.appendChild(price)
  tr.appendChild(priceTd)

  table.appendChild(tr)
  for(let item of allItems) {

    let tr = document.createElement("tr");

    let idTd = document.createElement("td");
    let id = document.createTextNode(item.id);
    idTd.appendChild(id)
    tr.appendChild(idTd)

    let nameTd = document.createElement("td");
    let name = document.createTextNode(item.name);
    nameTd.appendChild(name)
    tr.appendChild(nameTd)

    let priceTd = document.createElement("td");
    let price = document.createTextNode(item.price);
    priceTd.appendChild(price)
    tr.appendChild(priceTd)
    table.appendChild(tr)

  }


}
