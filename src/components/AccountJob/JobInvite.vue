<template >
    <div>
        <div v-for="(application, index) in applicationList" :key="'job-apply-' + index">
            <div v-if="application.createdBy == 1 && application.status.value == turnInValue">
                <div class="row q-gutter-md">
                    <div class="col-2">
                        <q-img :src="application.companyId.info.logo"></q-img>
                    </div>
                    <div class="col-7">
                        <div>
                            <router-link
                                :to="'/viec-lam/' + application.jobId.info.name + '---' + application.companyId._id">
                                <span class="text-weight-bold cursor-pointer">{{ application.jobId.info.name }}</span>
                            </router-link>
                        </div>
                        <div>
                            <span class="text-grey-6 ">{{ application.companyId.info.name }}</span>
                        </div>
                        <div class="text-grey-6">
                            <span v-for="(location, indexLocation) in application.jobId.info.workingAddress"
                                :key="index + '-' + location.province + '-' + indexLocation">
                                {{ indexLocation < application.jobId.info.workingAddress.length - 1 ? location.province
                                        + ', ' : location.province
                                }} </span>
                        </div>
                        <div class="text-warning">
                            <div v-if="application.jobId.info.salaryRate.isVisible">
                                <span>
                                    {{ application.jobId.info.salaryRate.from }}
                                </span>
                                <span>
                                    $
                                </span>
                                <span>{{ " - " }}</span>
                                <span>
                                    {{ application.jobId.info.salaryRate.to }}

                                </span>
                                <span>
                                    $
                                </span>
                            </div>
                            <div v-else>
                                <span>
                                    Th????ng l?????ng
                                </span>
                            </div>
                        </div>
                        <div class="text-grey-6">
                            <span>
                                ???? t???o {{ " " }}
                            </span>
                            <span v-if="$moment().diff($moment(application.createdAt), 'days') > 0">
                                {{ $moment().diff($moment(application.createdAt), 'days') + "ng??y tr?????c" }}
                            </span>
                            <span v-else>
                                trong h??m nay
                            </span>
                        </div>
                    </div>
                    <div class="col-2 ">
                        <div class="col q-gutter-xs">
                            <q-btn :disable="application.isLoading" @click="accept(index)" class="fit" color="negative"
                                outline label="Nh???n"></q-btn>
                            <q-btn :disable="application.isLoading" @click="reject(index)" class="fit" color="negative"
                                unelevated label="T??? ch???i"></q-btn>
                        </div>

                    </div>
                </div>
                <q-separator class="q-my-md"></q-separator>
            </div>
        </div>
  
    </div>

</template>
<script>
import { approveByUser, rejectByUser } from "../../apis/application"
import { useQuasar } from "quasar"
import { applicationDictionary } from "../../assets/dictionary/application"

export default {
    props: { applicationList: Array },
    data() {
        return {
            $q: useQuasar(),
            turnInValue: applicationDictionary.status.turnIn.value
        }
    },
    methods: {
        accept(index) {
            this.applicationList[index].isLoading = true
            approveByUser({ applicationId: this.applicationList[index]._id }).then(data => {
                if (data) {
                    this.applicationList[index].status = data.status
                    this.$q.notify({
                        message: 'Ch???p thu???n th??nh c??ng',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                } else {
                    this.$q.notify({
                        message: 'Ch???p thu???n th???t b???i',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'report',
                    })
                }
                this.applicationList[index].isLoading = false
            })

        },
        reject(index) {
            this.applicationList[index].isLoading = true
            rejectByUser({ applicationId: this.applicationList[index]._id }).then(data => {
                if (data) {

                    this.applicationList[index].status = data.status
                    this.$q.notify({
                        message: 'T??? ch???i th??nh c??ng',
                        color: 'green-6',
                        position: "bottom-right",
                        icon: 'check_circle',
                    })
                } else {
                    this.$q.notify({
                        message: 'T??? ch???i th???t b???i',
                        color: 'deep-orange-6',
                        position: "bottom-right",
                        icon: 'report',
                    })
                }
                this.applicationList[index].isLoading = false
            })
        }
    }

}
</script>
<style lang="">
    
</style>