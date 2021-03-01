/*
export function someGetter (state) {
}
*/

export default {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        count: product.count
      }
    })
  }
}
