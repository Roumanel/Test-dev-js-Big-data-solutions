//This code will generate a graph of Orders value based on its period 
// Create a new Orders
const Order1 = new Map([
    ['Cheese', 22.2],
    ['Chocolate', 10.3],
    ['Impulse', 1.5],
    ['periode', "2021_26"],
]);
const Order2 = new Map([
    ['Cheese', 21.8],
    ['Chocolate', 9.8],
    ['Impulse', 1.5],
    ['periode', "2021_27"],
   
]);
const Order3 = new Map([
    ['Cheese', 21.2],
    ['Chocolate', 9.7],
    ['Impulse', 1.4],
    ['periode', "2021_28"],
]);

// Create List of Orders
const Orders = [];
Orders.push(Order1,Order2,Order3);

var OrdersWithMean = [];
var OrdersPeriode = [];
var OrdersGraphValue = [];

// Getting the list of periods
OrdersPeriode = GetOrdersPropertie(Orders,'periode');

// Adding the mean of each order properties( cheese , chocolate ,...) to the list of order
OrdersWithMean= GetOrdersWithMean(Orders);

//Generatinf Graph Values of Order list
OrdersGraphValue= GenerateOrdersGraph(OrdersWithMean);


// drawing the OrdersGraph
var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart
  (     ctx, 
        {
            type: 'line',
            data: 
            {
                labels: OrdersPeriode,
                datasets: OrdersGraphValue
            }
        }
  );

// Function GetOrdersWithMean returns Orders list with the mean of each order values it uses 
/*@Orders {array} it cotains the Orders list*/

function GetOrdersWithMean(Orders) 
   
{ try {
    

        var ordersWithMean= [];
        Orders;

        for (let order of Orders) 
        {
        var total = 0;
        order.delete('periode');

        for (let OrderProperties of order.keys()) 
        {
            
            total += order.get(OrderProperties);
                
        }

        order.set('Mean',total/3);
        ordersWithMean.push(order);
        }
        return ordersWithMean;
    }
    catch (error) {
        Rollbar.error("Something went wrong", error);
    }
}

// Function GetOrdersPropertie returns list of order element specified by the user it uses 
/*@Orders {array} it cotains the Orders list
  @key {array} it cotains the key of order element
*/

function GetOrdersPropertie(Orders,key)
   
{try {
        var ordersPropertie= [];
        

        for (let order of Orders) 
        {

        ordersPropertie.push(order.get(key));

        }

        return  ordersPropertie;
    }
    catch (error) {
        Rollbar.error("Something went wrong", error);
    }
}
  
/*Function GenerateOrdersGraph returns list value of each order element,it's used for drawing these values 
according to its period. It uses
@Orders {array} it cotains the Orders list
*/
function GenerateOrdersGraph(Orders)

    { try {
        var OrdersgraphValue = [];

        for(let OrdersPropertie of Orders[0].keys())
           
            { 
                var OrdergraphValue = 

                    {
                        label: OrdersPropertie, 
                        data: [],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                        ], 
                    };

                for (let order of Orders) 
                    {
                
                    OrdergraphValue.data.push(order.get(OrdersPropertie));
                
                    }

                OrdersgraphValue.push(OrdergraphValue);

            }
            return OrdersgraphValue;
        }
        catch (error) {
            Rollbar.error("Something went wrong", error);
        }
        
    }