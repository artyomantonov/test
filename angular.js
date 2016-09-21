class signInFormController {
    constructor($auth, ToastService) {
        'ngInject';

        this.$auth = $auth;
        this.ToastService = ToastService;
    }

    $onInit(){
        this.email = '';
        this.password = '';
    }

    signIn() {
        let customer = {
            email: this.email,
            password: this.password
        };

        this.$auth.signIn(customer)
            .then((response) => {
            this.$auth.setToken(response.data);

        this.ToastService.show('Logged in successfully.');
    })
    .catch(this.failedsignIn.bind(this));
    }

    failedsignIn(response) {
        if (response.status === 422) {
            for (let error in response.data.errors) {
                return this.ToastService.error(response.data.errors[error][0]);
            }
        }
        this.ToastService.error(response.statusText);
    }
}

export const signInFormComponent = {
    templateUrl: 'myUrl',
    controller: signInFormController,
    controllerAs: 'vm',
    bindings: {}
}