import axios from 'axios';
import FIREBASE from "../firebase";

class Executive{

  getReports = async(agent_id,date) => {
    const res = await axios.get(`https://se-smartpos-backend.herokuapp.com/api/v1/report/viewreport`
    );
    return res;
  };

  getStock = async () => {
    const res = await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/stock/viewwarehouse');
    return res.data;
  };

  getAllAgents = async() => {
    const queryRef = FIREBASE.firestore().collection("users")
      .where("type", "==", "agent");
    const querySnap = await queryRef.get();
    const agents = [];
    querySnap.docs.forEach(doc => {
      const data = doc.data();
      agents.push(data)
    });
    return agents;
  };

  getAgentsWithRequests = async() => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/reqinvoice/getagentids')
  };

  getAgentRequests = async (agent_id) => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/reqinvoice/viewacceptedlist',{
      params:{
        employee_id:agent_id
      }
    })
  };

  sendRequest = async (agent_id,product_id,quantity,requesting_invoice_items_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/product/send-agent-requested',{
      agent_id,
      product_id,
      quantity,
      requesting_invoice_items_id
    })
  };

  rejectRequest = async (requesting_invoice_items_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/reqinvoice/declaresuggestion',{
      requesting_invoice_items_id
    })
  };

  sendStock = async(agent_id,product_id,quantity) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/product/send-to-agent',{
      agent_id,
      product_id,
      quantity
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

  getShopSuggestion = async () => {
    return await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/owner/viewsuggestion')
  };

  acceptShopSuggestion = async(shop_suggestion_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/owner/acceptsuggestion',{
      shop_suggestion_id
    })
  };

  rejectShopSuggestion = async(shop_suggestion_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/owner/declinesuggestion',{
      shop_suggestion_id
    })
  };

  getLineGraphData = async (owner_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/ownerlinegraph',{
      params:{
        owner_id
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

  getBarGraphData = async (owner_id,product_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/ownerbargraph',{
      params:{
        owner_id,
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

  getDistrictMonthLineData = async () => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/dis-month-graph');
    if(res.data.success){
      const dataSet = res.data.data;
      const labels = [];
      const dataArray = [];
      dataSet.forEach(data => {
        labels.push(data.district_name);
        dataArray.push(data.total_revenue);
      });
      return {
        labels: labels,
        datasets: [
          {
            label: "Performance",
            data: dataArray
          }
        ]
      };
    }
  };

  getDistrictYearLineData = async () => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/dis-yr-graph');
    if(res.data.success){
      const dataSet = res.data.data;
      const labels = [];
      const dataArray = [];
      dataSet.forEach(data => {
        labels.push(data.district_name);
        dataArray.push(data.total_revenue);
      });
      return {
        labels: labels,
        datasets: [
          {
            label: "Performance",
            data: dataArray
          }
        ]
      };
    }
  };

  getDistrictMonthBarData = async (product_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/dis-month-bar-graph',{
      params:{
        product_id
      }
    });
    if(res.data.success){
      const dataSet = res.data.data;
      const labels = [];
      const dataArray = [];
      dataSet.forEach(data => {
        labels.push(data.district_name);
        dataArray.push(data.total_quantity);
      });
      return {
        labels: labels.reverse(),
        datasets: [
          {
            label: "Performance",
            data: dataArray.reverse()
          }
        ]
      };
    }
  };

  getDistrictYearBarData = async (product_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/graph/dis-yr-bar-graph',{
      params:{
        product_id
      }
    });
    if(res.data.success){
      const dataSet = res.data.data;
      const labels = [];
      const dataArray = [];
      dataSet.forEach(data => {
        labels.push(data.district_name);
        dataArray.push(data.total_quantity);
      });
      return {
        labels: labels.reverse(),
        datasets: [
          {
            label: "Performance",
            data: dataArray.reverse()
          }
        ]
      };
    }
  };

  getTopProductsByMonth = async (owner_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/top-pr-owner-month',{
      params: {
        owner_id
      }
    });
    return res.data;
  };

  getTopProductsByYear = async (owner_id) => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/top-pr-owner-year',{
      params: {
        owner_id
      }
    });
    return res.data;
  };

  getTopDistrictsByYear = async () => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/top-dis-year');
    return res.data;
  };

  getTopDistrictsByMonth = async () => {
    const res =  await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/report/top-dis-month');
    return res.data;
  };

  addToWarehouse = async (productData) => {
    //quantity, product_id
    const res =  await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/product/additems',{
      quantity: productData.quantity,
      product_id: productData.productID
    });
    return res.data;
  };

  addNewProduct = async (productData) => {
    const res =  await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/product/addnewproduct',{
      name: productData.productName,
      quantity: productData.quantity,
      product_id: productData.productID,
      production_cost:productData.productCost,
      selling_price: productData.sellingPrice,
    });
    return res.data;
  };

  getMonthlyTarget = async () => {
    const res = await axios.get('https://se-smartpos-backend.herokuapp.com/api/v1/owner/viewmonthlytarget');
    return res.data
  };

  setTarget = async (target_value) => {
    const res = await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/owner/sendtarget',{
      target_value
    });
    return res.data;
  };


}

const executive = new Executive();

export default executive;