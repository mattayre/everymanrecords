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






      /*
      moltin.Authenticate(function() {

      console.log("Get a product");
      var product = moltin.Product.Find({id: productname});
      console.log(product);

      console.log("Add product to cart");
      var item = moltin.Cart.Insert(product[0].id, 1, null);
      console.log(item);

      console.log("Convert cart to order");
      var order = moltin.Cart.Complete({
        gateway: 'dummy',
        customer: {
          first_name: 'David',
          last_name:  'Ayre',
          email:      'david.ayre7@gmail.com'
        },
        bill_to: {
          first_name: 'David',
          last_name:  'Ayre',
          address_1:  '252 Nile Street',
          address_2:  '',
          city:       'Nelson',
          county:     '',
          country:    'NZ',
          postcode:   '7010',
          phone:      '+64-3-545-6169'
        },
        ship_to: 'bill_to',
        shipping: 'free-shipping'
      });
      console.log(order);

      console.log("Process payment");
      var checkout = moltin.Checkout.Payment('purchase', order.id, {
        data: {
          number:       '4242424242424242',
          expiry_month: '02',
          expiry_year:  '2017',
          cvv:          '123'
        }
      });
      console.log(checkout);

      console.log("End");
      alert("End");
      });
      */
     
    