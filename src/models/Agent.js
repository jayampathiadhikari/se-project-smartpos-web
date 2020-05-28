import axios from 'axios';

class Agent{

  viewSuggestedList = async (employee_id) => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/reqinvoice/viewsuggestedlist',{
      params:{
        employee_id:employee_id
      }
    })
  };

  acceptSuggestion = async (requesting_invoice_items_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/reqinvoice/sendrequest',{
      requesting_invoice_items_id
    })
  };

  declineSuggestion = async (requesting_invoice_items_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/reqinvoice/declaresuggestion',{
      requesting_invoice_items_id
    })
  };

  getShops = async (district_id) => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/shop/viewagentshops',{
      params:{
        district_id
      }
    })
  };

  getReports = async (agent_id,sold_date) => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/viewreport',{
      params:{
        agent_id,
        sold_date
      }
    })
  };

  getStock = async (agent_id) => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/stock/viewagentstock',{
      params:{
        agent_id,
      }
    })
  };

  addStockToWarehouse = async (agent_id,product_id,new_quantity) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/stock/addtoagentstock',{
      agent_id,
      product_id,
      new_quantity
    })
  };

  addStockToSalesperson = async (salesperson_id,product_id,quantity) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/stock/addtosalespersonstock',{
      salesperson_id,
      product_id,
      quantity
    })
  };

  getLineGraphData = async (agent_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/agentlinegraph',{
      params:{
        agent_id
      }
    });
    if(res.data.success){
      return {
        labels: res.data.data[1].reverse(),
        datasets: [
          {
            label: "Performance",
            data: res.data.data[0].reverse()
          }
        ]
      };
    }
  };
  getBarGraphData = async (agent_id,product_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/agentbargraph',{
      params:{
        agent_id,
        product_id
      }
    });
    if(res.data.success){
      return {
        labels: res.data.data[1].reverse(),
        datasets: [
          {
            label: "Performance",
            data: res.data.data[0].reverse()
          }
        ]
      };
    }
  };
}

const agent = new Agent();
export default agent;