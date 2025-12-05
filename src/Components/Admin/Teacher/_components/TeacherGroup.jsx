import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";

export default function TeacherGroups({ groups }) {
    if (!groups || groups.length === 0) {
        return <Typography>Guruhlar mavjud emas</Typography>;
    }

    return (
        <>
            {groups.map((g) => (
                <Card key={g.id} className="mb-4">
                    <CardBody className="flex justify-between items-center">
                        <div>
                            <Typography className="font-bold">
                                {g.group_name}
                            </Typography>

                            <Typography className="text-gray-600">
                                Guruh ID: {g.group_id}
                            </Typography>
                        </div>

                        <Chip value="Faol" color="green" />
                    </CardBody>
                </Card>
            ))}
        </>
    );
}
