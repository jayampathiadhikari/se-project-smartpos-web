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


}

const agent = new Agent();
export default agent;