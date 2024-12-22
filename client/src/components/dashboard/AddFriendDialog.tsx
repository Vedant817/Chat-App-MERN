import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface AddFriendDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const AddFriendDialog: React.FC<AddFriendDialogProps> = ({ open, onOpenChange }) => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [foundUser, setFoundUser] = useState<string | null>(null);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Please login first');
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:5000/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!data.user) {
                toast.error('Session expired. Please login again');
                return;
            }

            setLoggedInUser(data.user.fullName);
        } catch (error) {
            console.error('Error verifying user:', error);
            toast.error('Something went wrong. Please login again');
        }
    }

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/user/search?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();
            if (response.ok && result.fullName) {
                setFoundUser(result.fullName);
            } else {
                toast.error('User not found');
                setFoundUser(null);
            }
        } catch (error) {
            toast.error(`Error searching for user: ${error}`);
        }
    };

    const handleAddFriend = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!foundUser) {
            toast.error("Please search for a user first.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/user/addFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendUsername: foundUser, loggedInUsername: loggedInUser }),
            });

            if (response.ok) {
                toast.success(`${foundUser} added as a friend!`);
                setFoundUser(null);
                setUsername("");
            } else {
                const { message } = await response.json();
                toast.error(message);
            }
        } catch (error) {
            toast.error(`Error adding friend: ${error}`);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            <ToastContainer />
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Friend</DialogTitle>
                        <DialogDescription>
                            Enter your friend's username to add them to your chat list.
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            {foundUser && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-bold">Found User:</Label>
                                    <span className="col-span-3">{foundUser}</span>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSearch}>Search</Button>
                            <Button onClick={handleAddFriend}>Add Friend</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddFriendDialog;
