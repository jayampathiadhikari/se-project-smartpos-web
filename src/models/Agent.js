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

  addStockToSalesperson = async (agent_id,salesperson_id,product_id,quantity) => {
    const res =  await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/stock/addtosalespersonstock',{
      agent_id,
      salesperson_id,
      product_id,
      quantity
    });
    return res.data;
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

  getTopProductsByMonth = async (agent_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/top-pr-agent-month',{
      params: {
        agent_id
      }
    });
    return res.data;
  };

  getTopProductsByYear = async (agent_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/top-pr-agent-year',{
      params: {
        agent_id
      }
    });
    return res.data;
  };

  suggestShop = async (shopData) => {
    const res = await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/agent/suggest',{
      name : shopData.shopName,
      route_id : null,
      latitude : shopData.latitude,
      longitude : shopData.longitude,
      shop_contact_num : shopData.shopNo,
      name_with_initial: shopData.owner,
      contact_num_cell: shopData.mobile,
      contact_num_land: shopData.land,
      residence_lattitude: shopData.reslat,
      residence_longitude:shopData.reslng,
      email: shopData.email,
      district_id : shopData.districtID
    });
    return res.data
  };


}

const agent = new Agent();
export default agent;