

import { factoriesType } from "../../types/types"
import allEqual from '@/lib/arrTypeCheck';
const filterCalc = (array: number[]) => {

    const sortedPollution = array.sort((a, b) => b - a)
    const totalInitialEmission = sortedPollution.reduce((sum, pollution) => sum + pollution, 0)
    const halfInitialEmission = totalInitialEmission / 2
    const factories: factoriesType[] = []
    sortedPollution.map((factory) => { factories.push({ initPollution: factory, pollution: factory, airFilters: 0 }) })
    //  check if array consist of the same value
    if (allEqual(array)) {

        factories.map((factory, index) => {
            const currentTotalPollution = factories.reduce((acc, curr) => acc + curr.pollution, 0)


            factory.pollution = factory.pollution / 2
            factory.airFilters++


        })

    } else {

        factories.map((factory, index) => {
            let currentTotalPollution = factories.reduce((acc, curr) => acc + curr.pollution, 0)




            while (index < factories.length - 1 && factory.pollution >= factories?.[index + 1]?.pollution && currentTotalPollution >= halfInitialEmission) {
                factory.pollution = factory.pollution / 2
                factory.airFilters++
                currentTotalPollution = factories.reduce((acc, curr) => acc + curr.pollution, 0)
            }
        })



        let currentTotalPollution = factories.reduce((acc, curr) => acc + curr.pollution, 0)
        while (currentTotalPollution > halfInitialEmission) {

            factories.map((factory, index) => {
                currentTotalPollution = factories.reduce((acc, curr) => acc + curr.pollution, 0)




                if (index < factories.length - 1 && factory.pollution >= factories?.[index + 1]?.pollution && currentTotalPollution >= halfInitialEmission) {
                    factory.pollution = factory.pollution / 2
                    factory.airFilters++
                }

            })

            break

        }
    }

    return factories

}
export default filterCalc


// import { factoriesType } from "../../types/types"

// const filterCalc = (array: number[]) => {

//     const sortedPollution = array.sort((a, b) => b - a)
//     const totalInitialEmission = sortedPollution.reduce((sum, pollution) => sum + pollution, 0)
//     const halfInitialEmission = totalInitialEmission / 2
//     const factories: factoriesType[] = []
//     sortedPollution.map((factory) => { factories.push({ initPollution: factory, pollution: factory, airFilters: 0 }) })
//     factories.map((factory, index) => {
//         const currentTotalPollution = factories.reduce((acc, curr) => acc + curr.pollution, 0)
//         while (index < factories.length - 1 && factory.pollution >= factories?.[index + 1].pollution && currentTotalPollution >= halfInitialEmission) {
//             factory.pollution = factory.pollution / 2
//             factory.airFilters++
//         }

//     })
//     return factories
// }
// export default filterCalc