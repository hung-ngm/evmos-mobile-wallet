import { Validator } from '../types/validator';
import { makeAutoObservable, runInAction } from 'mobx';

class ValidatorStore {
    currentValidator: Validator | null = null ;
    validatorsMap = new Map<string, Validator>();

    constructor() {
        makeAutoObservable(this);
    }

    get validators(): Validator[] {
        return Array.from(this.validatorsMap.values());
    }

    fetchValidators = async () => {
        const response = await fetch('https://rest.bd.evmos.org:1317/cosmos/staking/v1beta1/validators?pagination.limit=304');
        const data = await response.json();
        const validators: Validator[] = data.validators
                                            .sort((a: any, b: any) => Number(b.tokens) - Number(a.tokens))
                                            .map((validator: any, index: number) => {
                                                return {
                                                    id: (index + 1).toString(),
                                                    name: validator.description.moniker,
                                                    operatorAddress: validator.operator_address,
                                                    logo: `https://github.com/cosmostation/cosmostation_token_resource/blob/master/moniker/evmos/${validator.operator_address}.png?raw=true`,
                                                    votingPower: Math.round(Number(validator.tokens)/1000000000000000000),
                                                    commissionPercentage: Number(validator.commission.commission_rates.rate),
                                                    APRPercentage: 0,
                                                    jailed: validator.jailed,
                                                    activeSet: (index + 1) <= 150 ? true : false,
                                                    description: validator.description.details,
                                                    website: validator.description.website
                                                }
                                            });
        runInAction(() => {
            validators.forEach((validator: Validator) => {
                this.validatorsMap.set(validator.operatorAddress, validator);
            });
        })
    }

    setValidator = (validator: Validator) => {
        this.currentValidator = validator;
    }

    selectValidator = (id: string): boolean => {
        if (!this.validatorsMap.has(id)) {
            this.currentValidator = null;
            return false;
        }
        this.currentValidator = this.validatorsMap.get(id);
        return true;
    }
}

export default ValidatorStore;