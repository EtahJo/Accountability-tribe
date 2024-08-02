"use client";
import Modal from "react-modal";
import { cn } from "@/lib/utils";

if (Modal.defaultStyles.overlay) {
	// eslint-disable-next-line
	Modal.defaultStyles.overlay.backgroundColor = "rgba(242,173,239,0.3)";
	// eslint-disable-next-line
	Modal.defaultStyles.overlay.zIndex = "100";
}

const ModalWrapper = ({
	isOpen,
	onRequestClose,
	contentLabel,
	children,
	modalHeader,
	className,
}: Modal.Props & { modalHeader?: string }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel={contentLabel}
			className={cn(
				"flex justify-center items-center place-content-center w-full h-full mx-auto ",
				className,
			)}
			closeTimeoutMS={100}
		>
			<div className="flex flex-col justify-center items-center gap-y-3">
				<h2 className="font-bold text-lg">{modalHeader}</h2>
				<div className="h-[700px] overflow-y-scroll overflow-x-hidden">
					{children}
				</div>
			</div>
		</Modal>
	);
};

export default ModalWrapper;
