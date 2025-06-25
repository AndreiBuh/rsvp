"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface RSVP {
  id: string;
  name: string;
  email: string;
  accompany: number;
  attendance: string;
  menu: string;
  details: string;
}

interface RSVPTableProps {
  data: RSVP[];
}

export function RSVPTable({ data }: RSVPTableProps) {
  const [filter, setFilter] = React.useState("");

  const filteredData = data.filter((rsvp) =>
    rsvp.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Calculate the total sum of accompany
  const totalAccompany = filteredData.reduce(
    (sum, rsvp) => sum + rsvp.accompany,
    0
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table className="bg-white rounded text-md">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Number of Guests</TableHead>
              <TableHead>Menu</TableHead>
              <TableHead>Attending</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((rsvp, index) => (
                <TableRow key={rsvp.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{rsvp.name}</TableCell>
                  <TableCell>{rsvp.email}</TableCell>
                  <TableCell>{rsvp.accompany || "0"}</TableCell>
                  <TableCell>{rsvp.menu}</TableCell>
                  <TableCell>{rsvp.attendance}</TableCell>
                  <TableCell>{rsvp.details}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <h5>Total: {totalAccompany}</h5>
      </div>
    </div>
  );
}
