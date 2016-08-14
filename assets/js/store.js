 //Authenticate moltin and then call addProductMain to add product and avoid callback
var moltin = new Moltin({publicId: 'vn6jZewrOYsgm2fkKoDCrHbsg7GTsz9YuvG9kyP8PG'}); 

function addProduct(productname, productnumber){
  moltin.Authenticate(function() {
    addProductMain(productname, productnumber);
  });
}
function addProductMain(productname, productnumber){
  var product = moltin.Product.Find({slug: productname});
  var item = moltin.Cart.Insert(product[0].id, productnumber, null);
  var cart = moltin.Cart.Contents();
  alert("Item Added To Cart");
}
function createCart(){
  moltin.Authenticate(function() {
    createCartMain();
  });
}
function createCartMain(){
  // create var cart which contains cart contents
  var cart = moltin.Cart.Contents();
  //loop through cart collection and each time load html and moltin contents 
  //to div id 'creatCart' with that loops product details
  var line = '';
  for (var product in cart.contents) {
      line += '<tr>';
      line += '<td>' + '<div class="img-container">';
      line += '<img src="assets/img/' + cart.contents[product].slug + '.jpg' + '" alt="..."/>'; 
      line += '</div>' + '</td>';
      line += '<td class = "td-name">';
      line += '<h4 id = "productName">' + cart.contents[product].title +'</td>';
      line += '<td>';
      line += '<p id = "description">' + cart.contents[product].description +'</p>';
      line += '<td class = "td-number">';
      line += '<h4 id = "price">' + cart.contents[product].pricing.formatted.without_tax+'</td>';
      line += '<td class = "td-number">';
      line += '<h4 id = "quantity">' + cart.contents[product].quantity+'</td>';
      line += '<td class = "td-number">';
      line += '<h4 id = "total">' + cart.contents[product].totals.pre_discount.formatted.without_tax +'</td></tr>';
  } 
  // load total of cart and html to id 'createCart' and display in page
  line += '<tr>'; 
  line += '<td colspan="2"></td>';
  line += '<td></td>';
  line += '<td class="td-total">Total</td>';
  line += '<td class="td-price">' + cart.totals.post_discount.formatted.without_tax + '</td>';
  line += '<td><button class="btn btn-info btn-fill btn-block"' + 'data-toggle="modal"';
  line += 'data-target="#checkoutModal">Checkout</button></td>';
  line += '<td></td>';
  line += '</tr>';
  el = document.getElementById('createCart');
  el.innerHTML = line; 
}


function checkout(){
  alert("start of checkout");
  moltin.Authenticate(function() {
    checkoutMain();
  });
}
function checkoutMain(){
  /*convert cart to order*/
  var order = moltin.Cart.Complete({
    gateway: 'dummy',
    customer: {
      first_name: $("#firstname").val(),
      last_name:  $("#secondname").val(),
      email:      $("#email").val()
    },
    bill_to: {
      first_name: $("#firstname").val(),
      last_name:  $("#secondname").val(),
      address_1:  $("#address1").val(),
      address_2:  $("#address2").val(),
      city:       $("#city").val(),
      county:     $("#county").val(),
      country:    $("#country").val(),
      postcode:   $("#postcode").val(),
      phone:      $("#phone").val()
    },
    ship_to: 'bill_to',
    shipping: 'free-shipping'
  });
  /*clear the cart*/
  moltin.Cart.Delete();
  /*add payment info to order*/
  var checkout = moltin.Checkout.Payment('purchase', order.id, {
    data: {
      number:       $("#cardnumber").val(),
      expiry_month: $("#expirymonth").val(),
      expiry_year:  $("#expiryyear").val(),
      cvv:          $("#cvv").val()
    }
  });
  alert("End of checkoutMain");
}



      