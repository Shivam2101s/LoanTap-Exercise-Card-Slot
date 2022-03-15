import { CardEvent, Transaction } from './types'

type CardTransactionMapping = {
  [cardId: string]: Transaction
}

/**
 * Write a function that receives a large batch of card events from multiple cards,
 * returning an object which maps from cardId -> valid transaction. Only cardIds with
 * a valid transaction should appear in the returned object.
 *
 * A valid transaction is a pair of card events, starting with a RESERVATION event
 * and finishing with either a CONFIRMATION or CANCELLATION event.
 *
 * The input is an array of unprocessed card events. Some events might be duplicated
 * or missing. For duplicated events, you may only use one of its occurrences and
 * discard the rest. Missing events invalidate the transaction.
 *
 * @param cardEvents CardEvent[] List of card events
 * @returns CardTransactionMapping Valid transactions grouped by cardId
 */
 export const processCardEvents = (cardEvents: CardEvent[]): Object => {
  interface data { [key: string]: any } //Declare the type of value
  let map: data = {};              //
  for (let i = 0; i < cardEvents.length; i++) {   ///Array traversal is performe
    if (!map[cardEvents[i].cardId]) {                 //Checking the key is present or not.....In our object
      map[cardEvents[i].cardId] = [cardEvents[i]];   /// Inserting the key pair value in our object
    }
    else {
      let len = map[cardEvents[i].cardId].length         // Calculating the length of array
      if (len > 1) continue;
      if ((map[cardEvents[i].cardId][0].id) != cardEvents[i].id) {
        map[cardEvents[i].cardId].push(cardEvents[i])
      }
    }
  }
  for (let i in map) {  ///........Eliminating the incomplete card....
    if (map[i].length !== 2) {
      delete map[i]
    }
  }
  return map;
}
