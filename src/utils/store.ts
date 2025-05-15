import { reactive } from "vue";

interface StateStore {
  open: boolean;
  onChange: () => void;
  show: boolean;
  modalType: 'create' | 'update'; 
  selectedClientId: number | null; 
  createNewModal: () => void;
  updateClientModal: (id: number) => void; 
  seller: boolean;
  createNewSellerModal: () => void;
  invoice: boolean;
  createNewInvoiceModal: () => void;
  video: boolean;
  videoModal: () => void;
  contact: boolean;
  createNewContactModal: () => void;
  filter: boolean;
  filterContactModal: () => void;
}

const stateStore: StateStore = reactive({
  open: false,
  onChange() {
    stateStore.open = !stateStore.open;
  },
  show: false,
  modalType: 'create', 
  selectedClientId: null, 
  createNewModal() {
    stateStore.modalType = 'create'; 
    stateStore.selectedClientId = null; 
    stateStore.show = !stateStore.show; 
  },
  updateClientModal(id: number) {
    stateStore.modalType = 'update'; 
    stateStore.selectedClientId = id;
    stateStore.show = !stateStore.show; 
  },
  seller: false,
  createNewSellerModal() {
    stateStore.seller = !stateStore.seller;
  },
  invoice: false,
  createNewInvoiceModal() {
    stateStore.invoice = !stateStore.invoice;
  },
  video: false,
  videoModal() {
    stateStore.video = !stateStore.video;
  },
  contact: false,
  createNewContactModal() {
    stateStore.contact = !stateStore.contact;
  },
  filter: false,
  filterContactModal() {
    stateStore.filter = !stateStore.filter;
  },
});

export default stateStore;