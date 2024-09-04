# Redeem Voucher Telkomsel

## Deskripsi

Ini adalah alat sederhana untuk melakukan redeem voucher Telkomsel. Alat ini menyediakan antarmuka web untuk memasukkan nomor HP dan serial voucher, dan juga memungkinkan Anda untuk melakukan redeem voucher melalui permintaan HTTP GET.

## Fitur

- **Halaman Utama**: Formulir untuk memasukkan nomor HP dan serial voucher.
- **API Endpoint**: Dapat melakukan redeem voucher melalui permintaan GET.

## Cara Kerja

1. **Halaman Utama**: 
    - Akses halaman utama untuk melakukan redeem voucher secara manual dengan memasukkan nomor HP dan serial voucher pada formulir yang disediakan.

2. **API Endpoint**:
    - Untuk melakukan redeem voucher menggunakan API, kirimkan permintaan GET ke endpoint berikut:
    
      ```
      https://cuan-reedem.vercel.app/api/redeem?voucher=$serialvoucher&nomorhp=$tujuan
      ```

    - **Parameter**:
        - `voucher`: Serial voucher yang ingin diredeem.
        - `nomorhp`: Nomor HP yang akan digunakan untuk redeem voucher.

    - **Contoh Permintaan GET**:
      ```
      https://cuan-reedem.vercel.app/api/redeem?voucher=1243656565&nomorhp=0823123456
      ```

    - **Respon**:
      - Respon akan berupa JSON yang menunjukkan hasil dari permintaan redeem voucher.


## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini, buat cabang baru, dan kirimkan pull request dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Jika Anda memiliki pertanyaan atau mengalami masalah, jangan ragu untuk membuka isu di repositori ini atau menghubungi pemelihara proyek.
