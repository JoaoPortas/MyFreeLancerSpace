import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const file: File | null = data.get('image')? data.get('image') as File : null;

    const designation: string | null = data.get('designation')? data.get('designation') as string : null;
    const brandId: string | null = data.get('brandId')? data.get('brandId') as string : null;
    const reference: string | null = data.get('reference')? data.get('reference') as string : null;
    const categoryId: string | null = data.get('categoryId')? data.get('categoryId') as string : null;
    const QtnPerPack: string | null = data.get('quantityPerPack')? data.get('quantityPerPack') as string : null;
    const normId: string | null = data.get('normId')? data.get('normId') as string : null;
    const price: string | null = data.get('price')? data.get('price') as string : null;
    const description: string | null = data.get('description')? data.get('description') as string : null;
    const stockState: string | null = data.get('stockState')? data.get('stockState') as string : null;

    let pictureImageName: string | null = null;
    console.log(file);
    if (file) {
        pictureImageName = `${uuidv4()}${path.extname(file.name)}`;
    }

    let sendData: string = JSON.stringify({
        name: designation,
        brandId: brandId,
        brandReference: reference,
        categoryId: categoryId,
        pack_ammount: QtnPerPack,
        norm_id: normId,
        price: price,
        description: description,
        priceWithVat: 1,
        stockAmmount: 1,
        stockState: stockState,
        vat: 23,
        pictureImage: pictureImageName
    });
    console.log(sendData);
    fetch(process.env.API_BASE_URL + "api/products", {
        method: "POST",
        body: sendData,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(promise => promise.json())
    .then(async (data) => {
        console.log(data);

        if (!file) {
            return NextResponse.json({ success: true });
        }
    
        console.log("dsadasd");
    
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
    
        // With the file data in the buffer, you can do whatever you want with it.
        // For this, we'll just write it to the filesystem in a new location
        const pathToSave = path.join(process.cwd(), `/public/static/products/images/${pictureImageName}`)
        await writeFile(pathToSave, buffer, (err) => console.log(err))
        console.log(`open ${pathToSave} to see the uploaded file`);
    })
    .catch(err => {
        console.log("uma merda qualquer");
        console.log(err);
    })

    return NextResponse.json({ success: true });
}