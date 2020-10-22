// state of cards (global variables)
let packets = []; // container array
let selectedIndex = Number(localStorage.getItem('selectedIndex'));
// localStorage only accepts string values, to get a number value i must convert it to a number

fetch('data.json')
  .then(res => res.json())
  .then(data => {

    packets = data.packets; // add fetched json data which accesses 'packets' object to defined empty array (packets)
    // sidenote: data is an object containing an array under the 'packets' key { packets: [...] }

    const selectedItem = packets[selectedIndex]; // to access the array of objects
    console.log(selectedItem); // console log all details of currently selected card

    render(packets, selectedIndex) // renders cards
  })

function select(i) {
  localStorage.setItem('selectedIndex', i); // set indexed item to localStorage 
  selectedIndex = i; // update the state
  render(packets, selectedIndex); // renders cards
}

function deselect() {
  localStorage.removeItem('selectedIndex');; // remove indexed item from localStorage and assign null
  selectedIndex = null; // update the state
  render(packets, selectedIndex); // renders cards
}

// render -> renders given packets(cards) on the page
// packets -> list of packets(cards) to render on the page
// selectedIndex -> the index of which packet(card) to render as selected
// !NB by providing invalid value it will select none
function render(packets, selectedIndex) {
  document.getElementById('cards').innerHTML =  
    packets.map((packet, i) => { // map over array of packets, takes in two params: packet(receives individual items from the list) and i(index)
      const isSelected = i === selectedIndex; // will have ternary condition ? if true : if false
      
      return `
      <div class="col-md-4 packet_card">
        <div class="d-flex justify-content-center">
          <img src="${packet.logo}" alt="icon">
        </div>
        <a class="pkg d-flex justify-content-center" href="#">
          ${packet.title}
        </a>
        <p class="pkg--text">
          ${packet.info}
        </p>
        <p class="pkg--price">
          ${packet.price} €
        </p>
        <button type="button" class="btn" onclick="${isSelected ? 'deselect()' : `select(${i})`}">
          <img src="../img/cart.png" alt="cart-icon" class="btn__cart">
          ${isSelected ? 'Ostukorvi lisatud' : 'Lisa ostukorvi'}
        </button>
      </div>`;
    }).join(''); // joins packets together without any coma in between
}