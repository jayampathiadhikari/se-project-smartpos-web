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

  sendRequest = async (agent_id,product_id,quantity) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/product/send-agent-requested',{
      agent_id,
      product_id,
      quantity
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
  }

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

  rejectShopSiggestion = async(shop_suggestion_id) => {
    return await axios.post('https://se-smartpos-backend.herokuapp.com/api/v1/owner/declinesuggestion',{
      shop_suggestion_id
    })
  }
}

const executive = new Executive();

export default executive;