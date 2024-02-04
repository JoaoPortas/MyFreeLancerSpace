export default function ProductDetails({ params: { dict, id } }: { params: { dict: any, id: string } }) {
    return (
        <h1>{id}</h1>
    );
}