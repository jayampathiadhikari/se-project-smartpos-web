import {getAgentsByRegion} from "../Utils";

describe('Examing api calls', () => {
  test('the data is peanut butter', () => {
    return getAgentsByRegion('Kegalle').then(data => {
      expect(data).toMatchObject([{id:"ySRNCA8E4hacmi9ZNsofSki5Uyv1",name:"Agent3"}]);
    });
  });

});