export default function Map({ id }) {
    const bungySRC = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9487.11259649583!2d168.88769021325902!3d-45.01405481451172!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa9d5213395d45a67%3A0x5b869eaad5f209ab!2sKawarau%20Gorge%20Suspension%20Bridge!5e0!3m2!1sen!2sil!4v1698745817928!5m2!1sen!2sil";
    
    const skyDiveSRC = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11598.627578129825!2d170.1846548!3d-43.3841977!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d2bd5de756b9773%3A0x2ee8f8f5b2bef5ee!2sSkydive%20Franz!5e0!3m2!1sen!2sil!4v1698748709995!5m2!1sen!2sil";
    

    const planeTourSRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90871.11384718856!2d167.77193544141483!3d-44.623152242522494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa9d5e04dba4b49e1%3A0x2a00ef86ab64de00!2sMilford%20Sound%20%2F%20Piopiotahi!5e0!3m2!1sen!2sil!4v1698836297495!5m2!1sen!2sil" ;

    let mapLink;

    if (id == 895) {
        mapLink = bungySRC;
    } else if (id == 896) {
        mapLink = skyDiveSRC; 
    } else if(id == 911){
        mapLink = planeTourSRC;
    }

        return (
        <>
            <iframe
                className="map"
                src={mapLink}
                width="800"
                height="650"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </>
    )
}
