<template>
    <v-container>
        <v-row justify="center">
            <v-col class="text-center text-h5">
                장바구니 목록
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col cols="auto" >
                <v-btn @click="clearCart" color="secondary">장바구니 비우기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn @click="orderCreate" color="primary">주문하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>제품ID</th>
                            <th>제품명</th>
                            <th>주문수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in getProductsInCart" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default{
    computed:{
        ...mapGetters(['getProductsInCart'])
    },
    methods:{
        clearCart(){
            this.$store.dispatch("clearCart");
        },
        async orderCreate(){
            const orderProducts = (this.getProductsInCart).map(p=>{
                return {productId:p.id,productCount:p.quantity}
            })

            if(orderProducts.length<1){ // 이거 말이 안되넹
                alert("주문대상의 물량이 없습니다.")
                return
            }

            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`);
            if(!yesOrNo){
                console.log("주문이 취소되었습니다.")
                return;
            }
            
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert("주문완료")
                this.clearCart();
            }catch(e){
                console.log(e)
                alert("주문실패")
            }
        }
    }
}
</script>