import api from "@/lib/api";

export const updateQrLabel = async ({id, payload}) => {
    console.log(id,payload);
    const res = await api.put(`/qr-data/${id}`, payload);
    return res.data;
};